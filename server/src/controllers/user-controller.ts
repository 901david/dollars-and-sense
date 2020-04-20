import { UserDbModel } from '../db/models/user-model';
import { RowDataPacket } from 'mysql2';
import { RequestHandler } from 'express';
import { UserCreationTransferObject } from '../models/user-creation-type';
import { handleUserPassword } from './user-auth-controller';

export const getUsers: RequestHandler = (req, res) => {
  UserDbModel.get((results: RowDataPacket[]) => {
    res.json(results);
  });
};

export const updateUser: RequestHandler = (req, res) => {
  const {
    body: data,
    params: { id },
  } = req;

  UserDbModel.update({ id }, data, (results: RowDataPacket[]) => {
    res.json(results);
  });
};

export const deleteUser: RequestHandler = (req, res) => {
  const {
    params: { id },
  } = req;

  UserDbModel.delete(id, (results: RowDataPacket[]) => {
    res.json(results);
  });
};

export const createUser: RequestHandler = async (req, res) => {
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
