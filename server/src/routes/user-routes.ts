import { Router } from 'express';
import {
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';

const userRouter = Router();

userRouter.route('/').get(getUsers);
userRouter.route('/:id').patch(updateUser).delete(deleteUser);

export default userRouter;
