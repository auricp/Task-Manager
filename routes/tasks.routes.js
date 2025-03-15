// file to declare task routes
import { Router } from 'express';
import { createTask } from '../controllers/tasks.controller.js'
import { authorize } from '../middlewares/authentication.middleware.js';

// will import controllers from controller file

const taskRouter = Router();

// create a task for a user (authorize)
taskRouter.post('/', authorize, createTask);


export default taskRouter;