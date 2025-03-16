import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { PORT, DB_URI } from './config/env.js'

import taskRouter from './routes/tasks.routes.js';
import userRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';

import Task from './models/task.model.js'


const app = express();

// front end 
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);


/*
app.get('/', (req,res, next) => {

    Task.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('tasks/index', { title: 'Home Page', tasks: result});
        })
        .catch((err) => next(err));


})
*/

// sign-in page
app.get('/', (req,res) => {
    res.render('auth/signIn');
})

app.get('/auth/signUp', (req,res) => {
    res.render('auth/signUp')
})




// using error middleware to catch any errors
app.use(errorMiddleware);


export default app;


