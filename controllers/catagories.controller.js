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
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description, course } = req.body; // Single course to be added

  try {
    // Find the category by ID
    const category = await Catagories.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const courseDetails = await Course.findOne({ name: course });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the course is already in the category's courses array
    if (category.courses.includes(courseDetails._id)) {
      return res.status(400).json({
        success: false,
        message: "Course already exists in the category",
      });
    }

    // Append the new course to the existing courses array
    category.courses.push(courseDetails._id);;

    // Optionally update the title and description if provided
    if (title) category.title = title;
    if (description) category.description = description;

    // Save the updated category
    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addCatagories, getAllCatagories, updateCategory };
