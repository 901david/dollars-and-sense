import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUsers,
} from '../controllers/user-controller';

export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').put(updateUsers);
