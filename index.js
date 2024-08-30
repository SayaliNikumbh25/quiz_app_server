import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import resultRoutes from './routes/resultRoutes.js';

env.config();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);


const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log('Connected to database Successfuly')})
    .then(()=> console.log(`Server is running at port ${process.env.PORT} `))
   
})