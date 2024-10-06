import Mcq from "../models/mcq.model.js";
import Subjects from "../models/subject.model.js";

const addMcq = async (req, res) => {
  const { subjectCode, question, options, correctAnswer, points } = req.body;
  try {
    const findMcq = await Mcq.findOne({ question: question });

    if (findMcq) {
      return res
        .status(400)
        .json({ success: false, message: "Mcq already exists" });
    }

    const subjectDetails = await Subjects.findOne({ code: subjectCode });

    if (!subjectDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    const newMcq = new Mcq({
      question,
      options,
      correctAnswer,
      points,
    });

    await newMcq.save();

    subjectDetails.mcqQuestions.push(newMcq._id); // Ensure the field name matches your model
    await subjectDetails.save(); // Save the updated subject details

    return res
      .status(201)
      .json({ success: true, message: "MCQ added successfully", mcq: newMcq });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMcqQuestions = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const gradeMcqs = async (req, res) => {
  const { id, answers } = req.body; // Get user answers from the request body
  try {
    // Fetch the questions based on the question IDs submitted by the user
    const questions = await Mcq.find({
      _id: { $in: answers.map((answer) => answer.id) },
    });

    let totalScore = 0;

    // Iterate through the user's answers
    const feedback = answers.map((answer) => {
        const question = questions.find((q) => q._id.toString() === answer.id);

        if (!question) {
            console.log("Question not found for answer ID:", answer.id);
            return {
              id: answer.id,
              correct: false,
              correctAnswer: null,
              selectedAnswer: answer.selectedAnswer,
            };
          }

      const isCorrect = question && question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) {
        totalScore += question.points; // Add points for correct answer
      }

      return {
        id: question._id,
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        selectedAnswer: answer.selectedAnswer,
      };
    });
  
      // Respond with the total score and feedback for each question
      return res.status(200).json({ success: true, score: totalScore, feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export { addMcq, gradeMcqs };
