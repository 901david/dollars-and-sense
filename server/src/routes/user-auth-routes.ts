import { Router } from 'express';
import { handleUserRegister } from '../controllers/user-auth-controller';

export const userAuthRouter = Router();

userAuthRouter.post('/register', handleUserRegister);
