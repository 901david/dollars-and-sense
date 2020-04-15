import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

export const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(label({ label: 'Server Logs' }), timestamp(), myFormat),
  transports: [new transports.File({ filename: './logs/server-logs.log' })],
});
