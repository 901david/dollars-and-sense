import { orm } from '../../config/orm';
import { ExpressHandlerCB } from '../../models/express-handler-cb';
import { UserCreationTransferObject } from '../../models/user-creation-type';
import { User } from '../../models/user.type';

export const UserDbModel = {
  get: (cb: ExpressHandlerCB) => {
    orm.get('Users', cb);
  },
  create: (
    userCreationData: UserCreationTransferObject,
    cb: ExpressHandlerCB
  ) => {
    orm.create<Array<keyof User>, User>(
      'Users',
      <Array<keyof User>>Object.keys(userCreationData),
      userCreationData,
      cb
    );
  },
};
