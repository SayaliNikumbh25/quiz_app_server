import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      value: String, // This will be the URL or text depending on the type
      description: { type: String, default: "" }, // Optional description for 'imageWithText'
    },
  ],
  correctAnswer: String, // Only for Q&A type quizzes
  timer: Number, // in seconds
  questionType: String,
});

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["poll", "q&a"], required: true },
  questions: [questionSchema],
  impressions: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
