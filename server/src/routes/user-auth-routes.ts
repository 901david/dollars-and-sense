import { Router } from 'express';

import {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleIsUserAuthenticated,
} from '../controllers/user-auth-controller';

const userAuthRouter = Router();

userAuthRouter.get('/authenticated', handleIsUserAuthenticated);
userAuthRouter.post('/register', handleUserRegister);
userAuthRouter.post('/login', handleUserLogin);
userAuthRouter.post('/logout', handleUserLogout);

export default userAuthRouter;
