import passport from 'passport';
import passportJWT from 'passport-jwt';
import { JWTOptions } from '../models/jwt-options.type';
import { Express } from 'express';
import { getUser } from '../controllers/user-auth-controller';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export const jwtOptions: JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Hello world',
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
