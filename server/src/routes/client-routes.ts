import { Router } from 'express';
import {
  indexFileHandler,
  redirectHandler,
} from '../controllers/client-controller';
import { protectRoute } from '../controllers/user-auth-controller';

const clientRouter = Router();

clientRouter
  .get('/', indexFileHandler)
  .get('/protected', protectRoute(), indexFileHandler)
  .get('*', redirectHandler);

export default clientRouter;
