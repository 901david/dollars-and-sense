import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';

export const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').put(updateUser).delete(deleteUser);
