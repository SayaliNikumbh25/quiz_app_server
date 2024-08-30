import mongoose from 'mongoose';
import Quiz from '../models/quiz.js';
import Result from '../models/result.js';

const submitQuizResult = async (req, res) => {
  const { quizId, answers, score, recordId } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let calculatedScore = score || 0;
    let updatedAnswers = answers;

    // Only calculate score and determine correctness for Q&A type quizzes
    if (quiz.type === 'q&a') {
      updatedAnswers = answers.map(answer => {
        const question = quiz.questions.find(q => q._id == answer.questionId);
        console.log("question", question.correctAnswer, "ans", answer.selectedOption);
        const isCorrect = question && question.correctAnswer == answer.selectedOption;

        // Calculate the score based on correct answers
        if (quiz.questions.length == answers.length && isCorrect) calculatedScore += 1;

        return {
          ...answer,
          isCorrect,
        };
      });
    }

    // Find or create the result record
    let result;
    if (recordId) {
      // Update existing result
      result = await Result.findById(recordId);
      if (result) {
        result.answers = updatedAnswers;
        result.score = calculatedScore;
        await result.save();
        return res.status(200).json({ result, message: 'Quiz updated successfully' });
      }
      return res.status(404).json({ message: 'Record not found' });
    } else {
      // Create new result
      result = new Result({
        quizId,
        answers: updatedAnswers,
        score: calculatedScore,
      });
      await result.save();
      return res.status(201).json({ result, message: 'Quiz submitted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getResultsByID = async(req,res)=>{
  const id = req.params.id
  console.log(id)
  try {
    const data = await Result.find({
      quizId:id})
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error)
  }
    

}

export { submitQuizResult, getResultsByID };
