import express from 'express';
import mongoose from 'mongoose';
import taskRouter from './routes/tasks.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';


const app = express();

// MIDDLEWARE for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Using routes 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);



// using error middleware to catch any errors
app.use(errorMiddleware);


// connect to mongoDB database and start the server











export default app;


