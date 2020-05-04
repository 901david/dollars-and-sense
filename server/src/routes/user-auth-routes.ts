import { Router } from 'express';
import passport from 'passport';

import {
  handleUserRegister,
  handleUserLogout,
  handleIsUserAuthenticated,
  handleLogin,
} from '../controllers/user-auth-controller';

const userAuthRouter = Router();

// userAuthRouter.get(
//   '/authenticated',
//   passport.authenticate('local'),
//   handleIsUserAuthenticated
// );
userAuthRouter.post('/register', handleUserRegister);
userAuthRouter.post('/login', handleLogin);
userAuthRouter.post('/logout', handleUserLogout);

export default userAuthRouter;
