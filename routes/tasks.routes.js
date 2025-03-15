// file to declare task routes
import { Router } from 'express';

// will import controllers from controller file

const taskRouter = Router();

// Get all tasks for a specific user based off id (will need to use auth)
taskRouter.get('/:id')