import mongoose from "mongoose";

const McqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        }
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 1,
    }
})

const Mcq = mongoose.model('Mcq', McqSchema);
export default Mcq