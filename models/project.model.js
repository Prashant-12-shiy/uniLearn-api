import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Completed', 'On Hold', 'Canceled'],
    },
    resourcesUrl: {
        type: String,
        required: true
    },
})

const Project = mongoose.model('Project', projectSchema);

export default Project;