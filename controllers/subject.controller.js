import Course from "../models/course.model.js";
import Subjects from "../models/subject.model.js";
import Notes from "../models/notes.model.js";
import PastQuestion from "../models/pastQuestions.model.js";
import Project from "../models/project.model.js";

const addSubject = async (req, res) => {
  const { name, syllabus, notes, pastQuestions, projects } = req.body;

  try {
    const ifSubject = await Subjects.findOne({ name: name });

    if (ifSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject already exists",
      });
    }

    const noteDetails = await Notes.findOne({ title: notes });
    if (!noteDetails) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }
    const pastQuestionDetails = await PastQuestion.findOne({
      name: pastQuestions,
    });
    if (!pastQuestionDetails) {
      return res.status(404).json({
        success: false,
        message: "Past questions not found",
      });
    }
    const projectDetails = await Project.findOne({ title: projects });
    if (!projectDetails) {
      return res.status(404).json({
        success: false,
        message: "Projects not found",
      });
    }

    const subject = new Subjects({
      name,
      syllabus,
      notes: noteDetails._id,
      pastQuestions: pastQuestionDetails._id,
      projects: projectDetails._id,
    });

    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Subject added successfully",
      data: subject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subjects.findById(id)
      .populate("notes", "title")
      .populate("pastQuestions", "name")
      .populate("projects", "title");

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, syllabus, notes, pastQuestions, projects } = req.body;

  try {
    const subject = await Subjects.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const updatedsubject = await Subjects.findByIdAndUpdate(
      id,
      { $set: { name, syllabus, notes, pastQuestions, projects } },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addSubject, getSubject };
