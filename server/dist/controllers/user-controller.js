"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../db/models/user-model");
exports.getUsers = (req, res) => {
    user_model_1.UserDbModel.get((results) => {
        res.json(results);
    });
};
exports.updateUser = (req, res) => {
    const { body: data, params: { id }, } = req;
    user_model_1.UserDbModel.update({ id }, data, (results) => {
        res.json(results);
    });
};
exports.deleteUser = (req, res) => {
    const { params: { id }, } = req;
    user_model_1.UserDbModel.delete(id, (results) => {
        res.json(results);
    });
};
exports.createUser = (req, res) => {
    const { body: userCreationData } = req;
    user_model_1.UserDbModel.create(userCreationData, (results) => {
        res.json(results);
    });
};
