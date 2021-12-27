import passport from 'passport';
import { Express } from 'express';
import bcrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';
import { getUser, getUserByEmail } from '../controllers/user-auth-controller';

const passwordIsCorrect = (userEnteredPass: string, dbPass: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userEnteredPass, dbPass, (err, result) => {
      if (err) reject(err);
      return resolve(result);
    });
  });
};

export const setUpAuthentication = (app: Express) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'user_password',
      },
      async (email, password, done) => {
        try {
          const user = await getUserByEmail(email).then(res => res[0]);
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          if (!(await passwordIsCorrect(password, user.user_password))) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user: { id: string }, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await getUser(id);
      done(undefined, user);
    } catch (err) {
      done(err, undefined);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
