import { UserDbModel } from '../db/models/user-model';
import { RowDataPacket } from 'mysql2';
import { RequestHandler } from 'express';
import { UserCreationTransferObject } from '../models/user-creation-type';

export const getUsers: RequestHandler = (req, res) => {
  UserDbModel.get((results: RowDataPacket[]) => {
    res.json(results);
  });
};

export const updateUsers: RequestHandler = (req, res) => {
  UserDbModel.get((results: RowDataPacket[]) => {
    res.json(results);
  });
};

export const deleteUsers: RequestHandler = (req, res) => {
  UserDbModel.get((results: RowDataPacket[]) => {
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
