import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { mainRouter } from './routes';
import { wrappedLogger } from './common/console-logger-wrapper';
import { logRequests } from './common/custom-logger-middleware';
import { request } from 'http';

const app = express();

const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, 'dist/static')));
app.use(express.json());
app.use(bodyParser({ extended: true }));

app.use(mainRouter);

request.on('finish', logRequests);

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
  wrappedLogger(
    'info',
    `Success! Started on Port: ${PORT}\n******************************************************`
  );
});
