import { Router } from 'express';
import { clientRouter } from './client-routes';

export const mainRouter = Router();

mainRouter.use(clientRouter);
