import Quiz from "../models/quiz.js";

const createQuiz = async (req, res) => {
  const { name, type, questions } = req.body;
  const userId = req.user.id;
  try {
    const newQuiz = new Quiz({
      name,
      type,
      questions,
      createdBy: userId,
    });
    const respone = await newQuiz.save();
    console.log("respone",respone)
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    quiz.impressions += 1;
    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id)
  const Quizdata = req.body
  console.log(id, Quizdata)
  try {
    const data =await Quiz.findByIdAndUpdate(id,Quizdata)
    res.status(200).json(
      {message: 'Quiz updated Successfulyy',
      data:data
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};

const getQuizzesByUser = async (req, res) => {
  try {  
    const quizzes = await Quiz.find({ createdBy: req.user.id });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteQuiz = async(req,res)=>{
  try {
    const id = req.params.id
    await Quiz.findByIdAndDelete(id)
    res.status(200).json({message: "quuiz deleted successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {createQuiz, updateQuiz, getQuiz,getQuizzesByUser,deleteQuiz}

