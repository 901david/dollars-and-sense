import { Router } from 'express';
import passport from 'passport';

import {
  handleUserRegister,
  handleUserLogout,
  handleIsUserAuthenticated,
  handleLogin,
  handleEmailConfirmation,
} from '../controllers/user-auth-controller';

const userAuthRouter = Router();

// userAuthRouter.get(
//   '/authenticated',
//   passport.authenticate('local'),
//   handleIsUserAuthenticated
// );
userAuthRouter.post('/register', handleUserRegister);
userAuthRouter.post('/confirm', handleEmailConfirmation);
userAuthRouter.post('/login', handleLogin);
userAuthRouter.post('/logout', handleUserLogout);

export default userAuthRouter;
