"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../../config/orm");
exports.UserDbModel = {
    get: (cb) => {
        orm_1.orm.get('Users', cb);
    },
    create: (userCreationData, cb) => {
        orm_1.orm.create('Users', Object.keys(userCreationData), userCreationData, cb);
    },
};
