import { Router } from 'express';

import {
  indexFileHandler,
  redirectHandler,
} from '../controllers/client-controller';

const clientRouter = Router();

clientRouter.get('/', indexFileHandler);
clientRouter.get('*', redirectHandler);

export default clientRouter;
