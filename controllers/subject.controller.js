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

    let noteDetails = [];
    if (notes && notes.length > 0) {
      noteDetails = await Notes.find({ _id: { $in: notes } });
      if (noteDetails.length !== notes.length) {
        return res.status(404).json({
          success: false,
          message: "One or more notes not found",
        });
      }
    }

    let pastQuestionDetails = [];
    if (pastQuestions && pastQuestions.length > 0) {
      pastQuestionDetails = await PastQuestion.find({ _id: { $in: pastQuestions } });
      if (pastQuestionDetails.length !== pastQuestions.length) {
        return res.status(404).json({
          success: false,
          message: "One or more past questions not found",
        });
      }
    }

    let projectDetails = [];
    if (projects && projects.length > 0) {
      projectDetails = await Project.find({ _id: { $in: projects } });
      if (projectDetails.length !== projects.length) {
        return res.status(404).json({
          success: false,
          message: "One or more projects not found",
        });
      }
    }

    const subject = new Subjects({
      name,
      syllabus,
      notes: noteDetails.map((note) => note._id),
      pastQuestions: pastQuestionDetails.map((pq) => pq._id),
      projects: projectDetails.map((proj) => proj._id),
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
