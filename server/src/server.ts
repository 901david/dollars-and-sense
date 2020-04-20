const NODE_ENV = (process.env.NODE_ENV as NodeEnv) || 'development';
if (NODE_ENV === 'development') {
  require('dotenv').config();
}

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import mainRouter from './routes';
import { ServerLogger } from './common/file-logger';
import { NodeEnv } from './models/node-env.type';
import { setUpAuthentication } from './config/authentication-setup';
import { setupGraphQl } from './config/graphql-setup';
import { protectRoute } from './controllers/user-auth-controller';

const app = express();
const serverLogger = new ServerLogger(app, NODE_ENV);
const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, 'dist/static')));
app.use(express.json());
app.use(bodyParser({ extended: true }));

setUpAuthentication(app);
setupGraphQl(app);
serverLogger.setupLoggingByEnv();
app.get('/protected', protectRoute(), (req, res) => {
  res.send('You get the secret');
});
app.use(mainRouter);

app.listen(PORT, (...err: any[]) => {
  if (err.length > 0) throw err;
  console.info(
    `Success! Started on Port: ${PORT}\n******************************************************`
  );
});
