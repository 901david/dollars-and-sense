import express, { NextFunction } from 'express';
import { format } from 'winston';
const { timestamp } = format;

import { wrappedLogger } from './console-logger-wrapper';
import { logger } from './file-logger';

interface LoggerData {
  timestamp: string;
  label: string;
  level: string;
  message: string;
  type: string;
}

const myLoggerTransformFn = (data: LoggerData) => {
  const { timestamp, label, level, message, type } = data;
  return `[${label}] ${level}: ${message} - ${type} - ${timestamp} `;
};
export const logRequests = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  console.log(Object.keys(req).toString());
  console.log(Object.keys(req));

  if (process.env.NODE_ENV !== 'production')
    wrappedLogger(
      'info',
      myLoggerTransformFn(
        Object.assign({
          label: 'Server Logs',
          level: 'info',
          message: req.url,
          timestamp: new Date().toISOString(),
          type: req.method,
        })
      )
    );
  else logger.info(req.url);
  next();
};
