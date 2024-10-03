import Course from "../models/course.model.js";
import Subjects from "../models/subject.model.js";
import Notes from "../models/notes.model.js";
import PastQuestion from "../models/pastQuestions.model.js";
import Project from "../models/project.model.js";
import Semester from "../models/semester.model.js";
import University from "../models/university.model.js";

const addSubject = async (req, res) => {
  const { name, syllabus, notes, pastQuestions, projects, code, course, semesterNumber } = req.body;

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
      code,
      notes: noteDetails.map((note) => note._id),
      pastQuestions: pastQuestionDetails.map((pq) => pq._id),
      projects: projectDetails.map((proj) => proj._id),
    });

    await subject.save();

// Find the course and populate the semesters
const courseDetails = await Course.findOne({ name: course }).populate("semesters", "semesterNumber");

if (!courseDetails) {
  return res.status(400).json({ message: "Course not found" });
}

// Find the matching semester in the course
const semester = courseDetails.semesters.find(s => s.semesterNumber === semesterNumber);

if (!semester) {
  return res.status(400).json({ message: "Semester not found in course" });
}

// Now that you have the semester ID, you need to find the Semester document separately to modify it
const semesterDoc = await Semester.findById(semester._id);

if (!semesterDoc) {
  return res.status(400).json({ message: "Semester document not found" });
}

// Push the subject into the semester's subjects array and save
semesterDoc.subjects.push(subject._id); // Assuming 'subjects' is an array in Semester schema
await semesterDoc.save();



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
        .populate("notes")
        .populate("pastQuestions")
        .populate("projects", "title");

      if (!subject) {
        return res.status(404).json({
          success: false,
          message: "Subject not found",
        });
      }

      const semester = await Semester.findOne({ subjects: id })
      .populate("course", "name description") // Populate course in the semester
      .select("semesterNumber course"); // Select semesterNumber and course fields

      const course = {
        name: semester.course.name,
        _id: semester.course._id,
      };

      const university = await University.findOne({ coursesOffered: semester.course._id})
      .select("name")
            
      return res.status(200).json({
        success: true,
        data: {subject,
          course,
          university,
        }
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
  const { name, syllabus, notes, pastQuestions, projects, code } = req.body;

  try {
    const subject = await Subjects.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }
    
    const findDocuments = async (model, ids, label) => {
      const docs = await model.find({ _id: { $in: ids } });
      if (docs.length !== ids.length) {
        return res.status(404).json({ success: false, message: `One or more ${label} not found` });
      }
      return docs;
    };

    let noteDetails = [];
    if (notes && notes.length > 0) {
      noteDetails = await findDocuments(Notes, notes, 'notes');
    }

    let pastQuestionDetails = [];
    if (pastQuestions && pastQuestions.length > 0) {
      pastQuestionDetails = await findDocuments(PastQuestion, pastQuestions, 'past questions');
    }

    let projectDetails = [];
    if (projects && projects.length > 0) {
      projectDetails = await findDocuments(Project, projects, 'projects');
    }

    // Merge new notes, past questions, and projects with the existing ones
    const mergedNotes = [...subject.notes, ...noteDetails];
    const mergedPastQuestions = [...subject.pastQuestions, ...pastQuestionDetails];
    const mergedProjects = [...subject.projects, ...projectDetails];

     const updatedSubject = await Subjects.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          syllabus,
          code,
          notes: mergedNotes,
          pastQuestions: mergedPastQuestions,
          projects: mergedProjects
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated subject",
      data: updatedSubject
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addSubject, getSubject, updateSubject };
