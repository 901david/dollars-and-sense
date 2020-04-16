import { RequestHandler } from 'express';
import { createUser } from './user-controller';
import jwt from 'jsonwebtoken';
import { makeQuery } from '../common/promisified-db-query';
import { User } from '../models/user.type';
import { jwtOptions } from '../config/authentication-setup';
import passport from 'passport';

export const getUser = (id: number) => {
  return makeQuery(`SELECT * FROM Users WHERE id=${id}`);
};

export const getUserByUserName = (username: string) => {
  console.log(`SELECT * FROM Users WHERE user_name=${username}`);
  return makeQuery(`SELECT * FROM Users WHERE user_name="${username}"`);
};

export const handleUserRegister: RequestHandler = createUser;

export const handleUserLogin: RequestHandler = async (req, res, next) => {
  try {
    const { user_name, user_password } = req.body;
    if (user_name && user_password) {
      const userData = await getUserByUserName(user_name);
      const user = userData[0] as User;
      console.log(user);
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
      if (user.user_password === user_password) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const protectRoute = (): RequestHandler => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
