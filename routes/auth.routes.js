import { signIn, signUp, signOut} from "../controllers/auth.controller.js";
import Router from 'express';


const authRouter = Router();


authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/sign-out', signOut);

export default authRouter;

