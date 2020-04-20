import { RowDataPacket } from 'mysql2';
import { RequestHandler } from 'express';

import { UserDbModel } from '../db/models/user-model';
import { UserCreationTransferObject } from '../models/user-creation-type';
import { handleUserPassword } from './user-auth-controller';

export const getUsers: RequestHandler = (_, res) => {
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
