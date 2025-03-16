// file to declare task routes
import { Router } from 'express';
import { createTask, deleteTask, getTask, editTask } from '../controllers/tasks.controller.js'
import { authorize } from '../middlewares/authentication.middleware.js';

// will import controllers from controller file

const taskRouter = Router();

// create a task for a user (authorize)
taskRouter.post('/', authorize, createTask);

// get page with all tasks
taskRouter.get('/:id', authorize, getTask);

// update a task
taskRouter.put('/:id', editTask);

// delete a specific task
taskRouter.delete('/:id', deleteTask);


export default taskRouter;