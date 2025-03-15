import Router from 'express';
import { authorize } from '../middlewares/authentication.middleware.js';
import { getUsers, getUser } from '../controllers/users.controller.js';

const userRouter = Router();


// get all users in the database
userRouter.get('/', getUsers);

// get specific user information (needs to be authorized)
userRouter.get('/:id', authorize, getUser)

export default userRouter;