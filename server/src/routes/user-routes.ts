import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user-controller';

export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
