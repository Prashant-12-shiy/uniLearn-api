import mongoose from "mongoose";
import  University  from "./university.model.js";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: University,
      required: true,
    },
    semesters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    }],
    duration: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;