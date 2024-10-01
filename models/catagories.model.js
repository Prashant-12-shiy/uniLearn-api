import mongoose from "mongoose";

const catagoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }]
})

const Catagories = mongoose.model("Catagories", catagoriesSchema);
export default Catagories;