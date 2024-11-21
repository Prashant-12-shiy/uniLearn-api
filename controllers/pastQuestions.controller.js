import PastQuestion from "../models/pastQuestions.model.js";
import Subject from "../models/subject.model.js"

const addPastQuestion = async (req, res) => {
    const {name, year, contentUrl, description, subject} = req.body;
    try {
        const question = await PastQuestion.findOne({contentUrl});

        if(question) {
            return res.status(400).json({
                success: false,
                message: "Past question already exists"
            });
        }
        
        const subjectDoc = await Subject.findOne({ name: subject });
        if (!subjectDoc) {
            return res.status(400).json({
                success: false,
                message: "Subject not found"
            });
        }

        const newQuestion = new PastQuestion({
            name,
            year,
            contentUrl,
            description
        });

        await newQuestion.save();


        // Add the past question to the subject's pastQuestions array
        subjectDoc.pastQuestions.push(newQuestion._id);
        await subjectDoc.save();

        return res.status(200).json({
            success: true,
            message: "Past question added successfully",
            data: newQuestion
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPastQuestions = async (req, res) => {
    try {
        const pastQuestions = await PastQuestion.find({});

        if(!pastQuestions){
            return res.status(200).json({
                success: false,
                message: "No past questions found"
            });
        }

        return res.status(200).json({
            success: true,
            data: pastQuestions
        });
    } catch (error) {  
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updatePastQuestions = async (req, res) => {

    const {id} = req.params;
    const {name, year, contentUrl, description} = req.body;
    try {
        
        const question = await PastQuestion.findById(id);

        if(!question) {
         return   res.status(404).json({
                success: false,
                message: "Question not found"
            })
        }

        const updatedQuestion = await PastQuestion.findByIdAndUpdate(id, {
            $set: {name, year, contentUrl, description}
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "Question updated",
            data: updatedQuestion
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deletePastQuestion = async (req, res) => {

    const {id} = req.params;

    try {
        const question = await PastQuestion.findById(id);
        
        if(!question) {
          return  res.status(404).json({
                success: false,
                message: "Question not found"
            })
        }
        
        const deletedQuestion = await PastQuestion.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Question deleted",
            data: deletedQuestion
        })

    } catch (error) {
       return  res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    addPastQuestion,
    getPastQuestions,
    updatePastQuestions,
    deletePastQuestion
}