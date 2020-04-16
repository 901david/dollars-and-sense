import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { mainRouter } from './routes';
import { ServerLogger } from './common/file-logger';

const { NODE_ENV } = process.env;
const app = express();
const serverLogger = new ServerLogger(app, NODE_ENV);
const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, 'dist/static')));
app.use(express.json());
app.use(bodyParser({ extended: true }));

serverLogger.setupLoggingByEnv();

app.use(mainRouter);

//TODO: Should redirect bad html reqs but error on api reqs
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(PORT, (...err: any[]) => {
  if (err.length > 0) throw err;
  console.info(
    `Success! Started on Port: ${PORT}\n******************************************************`
  );
});
