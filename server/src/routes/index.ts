import { Router } from 'express';
import { clientRouter } from './client-routes';

export const mainRouter = Router();

mainRouter.get('/api/*', (req, res) => {
  res.status(500).json({ error: 'API Route does not exist' });
});
mainRouter.use(clientRouter);
