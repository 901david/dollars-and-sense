import { Router } from 'express';
import {
  handleUserRegister,
  handleUserLogin,
} from '../controllers/user-auth-controller';

export const userAuthRouter = Router();

userAuthRouter.post('/register', handleUserRegister);
userAuthRouter.post('/login', handleUserLogin);
