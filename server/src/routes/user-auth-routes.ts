import { Router } from 'express';
import {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
} from '../controllers/user-auth-controller';

export const userAuthRouter = Router();

userAuthRouter.post('/register', handleUserRegister);
userAuthRouter.post('/login', handleUserLogin);
userAuthRouter.post('/logout', handleUserLogout);
