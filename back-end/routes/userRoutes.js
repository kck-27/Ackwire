import express from 'express';
import { signIn, signUp, adminSignIn } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/admin', adminSignIn);

export default userRouter;
