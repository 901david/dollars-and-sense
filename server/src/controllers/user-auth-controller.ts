import { RequestHandler } from 'express';
import { createUser } from './user-controller';

export const handleUserRegister: RequestHandler = createUser;
