import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import passport from 'passport';

import { makeQuery } from '../common/promisified-db-query';
import { User } from '../models/user.type';
import { UserDbModel } from '../db/models/user-model';
import { UserCreationTransferObject } from '../models/user-creation-type';

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

export const handleUserRegister: RequestHandler = async (req, res) => {
  const { body: userCreationData } = req;
  const hashedPass = await handleUserPassword(userCreationData);
  userCreationData.user_password = hashedPass;
  UserDbModel.create(
    userCreationData as UserCreationTransferObject,
    (results: RowDataPacket[]) => {
      console.log(req.user);
      res.json(results);
    }
  );
};

export const handleLogin: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/error');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Successfully Authenticated' });
    });
  })(req, res, next);
};

// export const handleUserLogin: RequestHandler = async (req, res) => {
//   try {
//     const { email, user_password } = req.body;
//     if (email && user_password) {
//       const userData = await getUserByEmail(email);
//       const user = userData[0] as User;
//       if (!user) {
//         res.status(401).json({ msg: 'No such user found', user });
//       }

//       const isValidPass = await passwordIsCorrect(
//         user_password,
//         user.user_password
//       );

//       if (isValidPass) {
//         const payload = { id: user.id };
//         const token = jwt.sign(payload, jwtOptions.secretOrKey);
//         res.json({ msg: 'ok', token: token });
//       } else {
//         res.status(401).json({ msg: 'Password is incorrect' });
//       }
//     }
//   } catch (err) {
//     throw err;
//   }
// };

export const handleUserLogout: RequestHandler = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const handleIsUserAuthenticated: RequestHandler = (req, res) => {
  res.json({ isAuthenticated: true });
};

// const passwordIsCorrect = (userEnteredPass: string, dbPass: string) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(userEnteredPass, dbPass, (err, result) => {
//       if (err) reject(err);
//       return resolve(result);
//     });
//   });
// };

export const protectRoute = (): RequestHandler => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not Authorized' });
};
