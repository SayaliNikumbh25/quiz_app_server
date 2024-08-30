// models/result.js
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedOption: { type: Number, required: true },
      isCorrect:{type:Boolean, default:false}
    },
  ],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
