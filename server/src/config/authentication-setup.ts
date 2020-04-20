import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Express } from 'express';

import { JWTOptions } from '../models/jwt-options.type';
import { getUser } from '../controllers/user-auth-controller';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export const jwtOptions: JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

export const setUpAuthentication = (app: Express) => {
  const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    const user = await getUser(jwt_payload.id);
    if (user) next(null, user);
    else next(null, false);
  });

  passport.use(strategy);

  app.use(passport.initialize());
};
