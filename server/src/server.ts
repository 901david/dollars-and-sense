import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { mainRouter } from './routes';
import morgan from 'morgan';

const app = express();

const PORT = process.env.PORT || 5005;

app.use(express.static(path.join(__dirname, 'dist/static')));
app.use(express.json());
app.use(bodyParser({ extended: true }));

app.use(mainRouter);

morgan('combined');

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
  console.log(
    `Success! Started on Port: ${PORT}\n*****************************************************`
  );
});
