import express from 'express'
import {
    createQuiz,
    getQuiz,
    updateQuiz,
    getQuizzesByUser,
    deleteQuiz,
  } from '../controllers/quizController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/',protect, createQuiz);
router.get('/:id', getQuiz);
router.patch('/:id', updateQuiz);
router.get('/user/quizzes',protect, getQuizzesByUser);
router.delete('/:id',deleteQuiz)

export default router
