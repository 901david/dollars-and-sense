import { Router } from 'express';
import {
  indexFileHandler,
  redirectHandler,
} from '../controllers/client-controller';

export const clientRouter = Router();

clientRouter.get('/', indexFileHandler);
// .get('*', redirectHandler);
