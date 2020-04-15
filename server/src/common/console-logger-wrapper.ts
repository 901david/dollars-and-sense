import { logger } from './file-logger';

type LogLevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

export const wrappedLogger = (type: LogLevelType, message: string) => {
  console.log(`${type}: - ${message}`);
  logger[type](message);
};
