"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../../config/orm");
class UserDbModel {
    static get(cb) {
        orm_1.orm.get('Users', cb);
    }
    static create(userCreationData, cb) {
        orm_1.orm.create('Users', Object.keys(userCreationData), userCreationData, cb);
    }
    static update(conditions, valuesToUpdate, cb) {
        orm_1.orm.update('Users', conditions, valuesToUpdate, cb);
    }
    static delete(id, cb) {
        orm_1.orm.delete('Users', id, cb);
    }
}
exports.UserDbModel = UserDbModel;
