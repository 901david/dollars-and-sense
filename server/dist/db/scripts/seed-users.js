"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../../config/connection"));
exports.seedUsers = () => connection_1.default.query('INSERT INTO Users (user_name, email, user_password) VALUES ("Bob", "Bob@gmail.com", "dasdas6d7asd67as6d")', (err, results) => {
    if (err)
        throw err;
    console.log(results);
});
