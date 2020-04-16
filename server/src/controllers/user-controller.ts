import { UserDbModel } from '../db/models/user-model';
import { RowDataPacket } from 'mysql2';
import { RequestHandler } from 'express';
import { UserCreationTransferObject } from '../models/user-creation-type';

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

export const createUser: RequestHandler = (req, res) => {
  const { body: userCreationData } = req;
  UserDbModel.create(
    userCreationData as UserCreationTransferObject,
    (results: RowDataPacket[]) => {
      res.json(results);
    }
  );
};
