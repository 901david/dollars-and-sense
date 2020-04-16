import { orm } from '../../config/orm';
import { ExpressHandlerCB } from '../../models/express-handler-cb';
import { UserCreationTransferObject } from '../../models/user-creation-type';
import { User } from '../../models/user.type';

export class UserDbModel {
  static get(cb: ExpressHandlerCB) {
    orm.get('Users', cb);
  }

  static create(
    userCreationData: UserCreationTransferObject,
    cb: ExpressHandlerCB
  ) {
    orm.create<Array<keyof User>, User>(
      'Users',
      <Array<keyof User>>Object.keys(userCreationData),
      userCreationData,
      cb
    );
  }

  static update<T extends Object, U extends Array<Object>>(
    conditions: T,
    valuesToUpdate: U,
    cb: ExpressHandlerCB
  ) {
    orm.update('Users', conditions, valuesToUpdate, cb);
  }

  static delete(id: string, cb: ExpressHandlerCB) {
    orm.delete('Users', id, cb);
  }
}
