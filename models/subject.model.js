import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    syllabus:  [
      {
        type: String,
        required: true,
      },
    ],
    notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notes',
      // required: true
  }],
  pastQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PastQuestion',
      // required: true
  }],
  projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      // required: true
  }]
  },
  {
    timestamps: true,
  }
);

const Subjects = mongoose.model('Subjects', subjectSchema);

export default Subjects;