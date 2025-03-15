import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { PORT, DB_URI, NODE_ENV } from './config/env.js'

import taskRouter from './routes/tasks.routes.js';
import userRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';


const app = express();

// MIDDLEWARE for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connect to mongoDB database and start the server
if (!DB_URI) {
    throw new Error('Define the MongoDB URI environment variable');
}


mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB database');
        
        app.listen(PORT, () => {
            console.log(`Task manager is running on http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })



// Using routes 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);



// using error middleware to catch any errors
app.use(errorMiddleware);


app.get('/', (req,res) => {
    res.send('Welcome to the task manager!');
})

export default app;


