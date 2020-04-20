import { Router } from 'express';

import {
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
