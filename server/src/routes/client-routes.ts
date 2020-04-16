import { Router } from 'express';
import { indexFileHandler } from '../controllers/client-controller';

export const clientRouter = Router();

clientRouter.get('/', indexFileHandler);
