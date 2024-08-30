// routes/resultRoutes.js
import express from 'express';
import { submitQuizResult, getResultsByID } from '../controllers/resultController.js';
 // If you have authentication middleware

const router = express.Router();

// Route to submit quiz result
router.post('/submit', submitQuizResult);
router.get('/:id',getResultsByID);

export default router;
