import { RequestHandler } from 'express';
import path from 'path';

export const indexFileHandler: RequestHandler = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
};

export const redirectHandler: RequestHandler = (req, res) => {
  res.redirect('/');
};
