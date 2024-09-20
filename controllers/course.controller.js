import University from "../models/university.model.js";
import Course from "../models/course.model.js";

const addCourses = async (req, res) => {
  const { name, shortName, description, university, syllabus } = req.body;

  try {
    const universityDetails = await University.findOne({ name: university });
    
    
    if (!universityDetails) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    const availableCourse = await University.findOne({name: university}).populate('coursesOffered', 'name');
    
    const courseNames = availableCourse.coursesOffered.map(course => course.name);

    // Check if the course name already exists
    if (courseNames.includes(name)) {
      return res.status(400).json({
        success: false,
        message: "Course already exists at the university",
      });
    }

    const newCourse = new Course({
      name,
      shortName,
      description,
      university: universityDetails._id,
      syllabus,
    });



    await newCourse.save();

    universityDetails.coursesOffered.push(newCourse._id);
    await universityDetails.save();

    return  res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find({})
    .populate("university", "name")
    .populate({
      path: "semesters",
      select: "semesterNumber",
      populate: {
        path: "subjects", // Populate subjects within semesters
        select: "name" // Select only the name field from subjects
      }
    });

    if (!allCourse) {
      return res.status(200).json({
        success: true,
        message: "No courses found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All courses",
      data: allCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate("university", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return  res.status(200).json({
      success: true,
      message: "Course found",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name,  shortName ,description, university, semesters, syllabus } = req.body;

  try {
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const updateData = {
      name,
      shortName,
      description,
      semesters,
      syllabus,
    };

    
    if (university) {
      const universityDetails = await University.findOne({ name: university }).populate('coursesOffered', 'name');

      if (!universityDetails) {
        return res.status(400).json({
          success: false,
          message: "University not found",
        });
      }

    if (universityDetails) {
      updateData.university = universityDetails._id;
    } else {
      updateData.university = existingCourse.university;
    }
    }

 
    const course = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const universityDetails = await University.findOne({ name: university });

    if (universityDetails && !universityDetails.coursesOffered.includes(course._id)) {
      universityDetails.coursesOffered.push(course._id);
      await universityDetails.save();
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const Ifcourse = await Course.findById(id);

    if (!Ifcourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const course = await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addCourses, getAllCourse, getCourse, updateCourse, deleteCourse };
