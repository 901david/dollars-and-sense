import { Router } from 'express';
import {
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';

export const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/:id').patch(updateUser).delete(deleteUser);
