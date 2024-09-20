import Course from "../models/course.model.js";
import Subjects from "../models/subject.model.js";
import Semester from "../models/semester.model.js";

const addSemester = async (req, res) => {
  const { course, semesterNumber, subjects, projects } = req.body;
  try {
    const courseDetails = await Course.findOne({ name: course });

    if (!courseDetails) {
      return res.status(400).json({ message: "Course not found" });
    }

    const subjectDetails = await Subjects.find({ name: { $in: subjects } });

    if (subjectDetails.length === 0) {
      return res.status(400).json({ message: "No subjects found" });
    }

    const subjectIds = subjectDetails.map((subject) => subject._id);

    const semester = await Semester.findOne({ semesterNumber: semesterNumber });

    if (semester) {
      return res.status(404).json({
        success: false,
        message: "Semester Already Exists",
      });
    }

    const newSemester = new Semester({
      course: courseDetails._id,
      semesterNumber,
      subjects: subjectIds,
      projects,
    });

    await newSemester.save();

    courseDetails.semesters.push(newSemester._id);
    await courseDetails.save();

    return res.status(200).json({
      success: true,
      message: "Semester added successfully",
      data: newSemester,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSemester = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSemester = async (req, res) => {
  const { id } = req.params;
  const { course, semesterNumber, subjects, projects } = req.body;

  try {
    const semester = await Semester.findById(id);
    if (!semester) {
      return res
        .status(404)
        .json({ success: false, message: "Semester not found" });
    }

    // Update fields only if they are provided in the request body
    const updates = {};
    if (course) {
      const courseDetails = await Course.findOne({ name: course });
      if (!courseDetails) {
        return res.status(400).json({ message: "Course not found" });
      }
      updates.course = courseDetails._id;
    }

    if (semesterNumber !== undefined) {
      updates.semesterNumber = semesterNumber;
    }

    if (subjects) {
      const subjectDetails = await Subjects.find({ name: { $in: subjects } });
      if (subjectDetails.length === 0) {
        return res.status(400).json({ message: "No subjects found" });
      }
      updates.subjects = subjectDetails.map((subject) => subject._id);
    }

    if (projects) {
      updates.projects = projects;
    }

    // Update the semester with the new values
    const updatedSemester = await Semester.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Semester updated successfully",
      data: updatedSemester,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addSemester, updateSemester };
