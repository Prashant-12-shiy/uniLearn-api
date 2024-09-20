import mongoose from "mongoose";

const pastQuestionSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    contentUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true,
})

const PastQuestion = mongoose.model('PastQuestion', pastQuestionSchema); 

export default PastQuestion;  