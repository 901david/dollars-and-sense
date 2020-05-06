import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import axios from 'axios';

import { makeQuery } from '../common/promisified-db-query';
import { User } from '../models/user.type';
import { UserDbModel } from '../db/models/user-model';
import { UserCreationTransferObject } from '../models/user-creation-type';
import {
  CONFIRMATION_EMAIL_FROM,
  CONFIRMATION_EMAIL_SUBJECT,
  CONFIRMATION_EMAIL_HTML,
} from '../common/constants';

const { API_GATEWAY_ENDPOINT, API_GATEWAY_SECRET } = process.env;

type ResultsSetHeader = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
};

export const handleUserPassword = (userData: User) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(userData.user_password, 10, function (err, hash) {
      if (err) reject(err);
      return resolve(hash.toString());
    });
  });
};

export const getUser = (id: number) => {
  return makeQuery(`SELECT * FROM Users WHERE id=${id}`);
};

export const getUserByEmail = (email: string) => {
  return makeQuery(`SELECT * FROM Users WHERE email="${email}"`);
};

const triggerConfirmationEmail = async (email: string, id: number) => {
  const emailData = {
    to: email,
    from: CONFIRMATION_EMAIL_FROM,
    subject: CONFIRMATION_EMAIL_SUBJECT,
    html: CONFIRMATION_EMAIL_HTML(id),
  };
  return axios.post(API_GATEWAY_ENDPOINT!, emailData, {
    headers: { 'x-api-key': API_GATEWAY_SECRET },
  });
};

export const handleUserRegister: RequestHandler = async (req, res) => {
  try {
    const { body: userCreationData } = req;
    const hashedPass = await handleUserPassword(userCreationData);
    userCreationData.user_password = hashedPass;
    UserDbModel.create(
      userCreationData as UserCreationTransferObject,
      async (results: any) => {
        if (results) {
          await triggerConfirmationEmail(
            userCreationData.email,
            results.insertId
          );
          res.json({ message: 'Successfully Registered User' });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const handleEmailConfirmation: RequestHandler = async (req, res) => {
  const { email } = req.body;
  const { message, status } = await isUserEmailConfirmed(email);
  res.status(status).json({ message });
};

export const isUserEmailConfirmed = async (email: string) => {
  const results = await UserDbModel.getOneByEmail(email);
  if (results.length === 0)
    return {
      confirmed: false,
      message: 'Email does not exist in system',
      status: 404,
    };
  else {
    const user = results.pop();
    const confirmed = user && user.email_confirmed === 1;
    if (confirmed)
      return {
        confirmed: true,
        message: 'Email is confirmed in system',
        status: 200,
      };
    else
      return {
        confirmed: false,
        message: 'Email is not confirmed in system',
        status: 425,
      };
  }
};

export const handleLogin: RequestHandler = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log('USER', user, 'err', err);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    return res.status(200).json({ message: 'Successfully Authenticated' });
    // req.logIn(user, function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   return res.status(200).json({ message: 'Successfully Authenticated' });
    // });
  })(req, res, next);
};

export const handleUserLogout: RequestHandler = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const handleIsUserAuthenticated: RequestHandler = (req, res) => {
  res.json({ isAuthenticated: true });
};

export const protectRoute = (): RequestHandler => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not Authorized' });
};
