import Course from "../models/course.model.js";
import Catagories from "../models/catagories.model.js";

const addCatagories = async (req, res) => {
  const { title, description, course } = req.body;

  try {
    // Check if the course field is an array
    if (!Array.isArray(course)) {
      return res.status(400).json({
        success: false,
        message: "Course should be an array",
      });
    }

    // Find the details of all courses provided
    const courseDetails = await Course.find({ name: { $in: course } });

    // console.log("Course details found:", courseDetails);

    // If no courses are found, return an error
    if (courseDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    // Extract the _id of the found courses
    const courseIds = courseDetails.map((courseDetail) => courseDetail._id);

    // console.log("Course IDs:", courseIds);

    const newCatagories = new Catagories({
      title,
      description,
      courses: courseIds,
    });

    await newCatagories.save();

    res.status(200).json({
      success: true,
      message: "Course catagory added successfully",
      data: newCatagories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCatagories = async (req, res) => {
  try {
    const catagories = await Catagories.find({}).populate(
      "courses",
      "name shortName"
    );

    res.status(200).json({
      success: true,
      message: "all catagories",
      data: catagories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addCatagories, getAllCatagories };
