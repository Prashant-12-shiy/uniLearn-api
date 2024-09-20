import mongoose from "mongoose";
import Course from "./course.model.js";

const semesterSchema = new mongoose.Schema({
    course: {
       type: mongoose.Schema.Types.ObjectId,
       ref: Course,
       required: true
    },
    semesterNumber: {
        type: Number,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects',
        required: true
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }]
},{
    timestamps: true
})

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester;