import morgan from 'morgan';
import { Express } from 'express';
import * as rfs from 'rotating-file-stream';
import path from 'path';
import { NodeEnv } from '../models/node-env.type';

export class ServerLogger {
  constructor(private _app: Express, private _nodeEnv: NodeEnv) {}

  setupLoggingByEnv() {
    if (this.nodeEnv !== 'test') {
      if (this.nodeEnv === 'development') this._setupDevLogging();
      this._setupFileLogging();
    }
  }

  get nodeEnv(): NodeEnv {
    return this._nodeEnv;
  }

  private _setupDevLogging() {
    this._app.use(morgan('dev'));
  }

  private _setupFileLogging() {
    var accessLogStream = rfs.createStream('access.log', {
      interval: '1d',
      path: path.join(__dirname, '..', '..', 'log'),
    });

    this._app.use(morgan('combined', { stream: accessLogStream }));
  }
}
