import passport from 'passport';
import passportJWT from 'passport-jwt';
import { JWTOptions } from '../models/jwt-options.type';
import DB_CONNECTION from './connection';
import { QueryError, RowDataPacket } from 'mysql2';
import { makeQuery } from '../common/promisified-db-query';
import { Express } from 'express';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions: JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Hello world',
};

const getUser = (id: number) => {
  return makeQuery(`SELECT * FROM Users WHERE id=${id}`);
};

export const setUpAuthentication = (app: Express) => {
  const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    console.log(jwt_payload);
    const user = await getUser(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

  passport.use(strategy);

  app.use(passport.initialize());
};
