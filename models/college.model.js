import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  logo: {
    type: String,
    default: "",
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", 
      required: true,
    },
  ],
  fees: {
    type: String, 
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  rating: {
    type: Number, 
    min: 0,
    max: 5,
    default: 0,
  },
  description: {
    type: String, 
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const College = mongoose.model("College", collegeSchema);
export default College;
