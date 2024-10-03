import mongoose from "mongoose";

const SyllabusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  hrs: {
    type: String,
  },
});

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // syllabus: [SyllabusSchema],
    syllabus: {
      type: String,
      required: true,
    },
    code: {
      type: String
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
        // required: true
      },
    ],
    pastQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PastQuestion",
        // required: true
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        // required: true
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subjects = mongoose.model("Subjects", subjectSchema);

export default Subjects;
