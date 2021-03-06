import { Router } from 'express';

import clientRouter from './client-routes';
import userRouter from './user-routes';
import userAuthRouter from './user-auth-routes';

const mainRouter = Router();

mainRouter.use('/api/users', userRouter);
mainRouter.use('/api/auth', userAuthRouter);
mainRouter.get('/api/*', (req, res) => {
  res.status(404).json({ error: 'API Route does not exist' });
});
mainRouter.use(clientRouter);

export default mainRouter;
