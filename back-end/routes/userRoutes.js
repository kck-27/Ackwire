import express from 'express';
import { signIn, signUp, getById } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);
userRouter.post('/get-by-id', userAuth, getById);

export default userRouter;
