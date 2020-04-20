"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user-controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promisified_db_query_1 = require("../common/promisified-db-query");
const authentication_setup_1 = require("../config/authentication-setup");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.handleUserPassword = (userData) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(userData.user_password, 10, function (err, hash) {
            if (err)
                reject(err);
            return resolve(hash.toString());
        });
    });
};
exports.getUser = (id) => {
    return promisified_db_query_1.makeQuery(`SELECT * FROM Users WHERE id=${id}`);
};
exports.getUserByUserName = (username) => {
    console.log(`SELECT * FROM Users WHERE user_name=${username}`);
    return promisified_db_query_1.makeQuery(`SELECT * FROM Users WHERE user_name="${username}"`);
};
exports.handleUserRegister = user_controller_1.createUser;
exports.handleUserLogin = async (req, res, next) => {
    try {
        const { user_name, user_password } = req.body;
        if (user_name && user_password) {
            const userData = await exports.getUserByUserName(user_name);
            const user = userData[0];
            console.log(user);
            if (!user) {
                res.status(401).json({ msg: 'No such user found', user });
            }
            const isValidPass = await passwordIsCorrect(user_password, user.user_password);
            if (isValidPass) {
                const payload = { id: user.id };
                const token = jsonwebtoken_1.default.sign(payload, authentication_setup_1.jwtOptions.secretOrKey);
                res.json({ msg: 'ok', token: token });
            }
            else {
                res.status(401).json({ msg: 'Password is incorrect' });
            }
        }
    }
    catch (err) {
        throw err;
    }
};
exports.handleUserLogout = async (req, res, next) => {
    req.logout();
    res.redirect('/');
};
const passwordIsCorrect = (userEnteredPass, dbPass) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(userEnteredPass, dbPass, (err, result) => {
            if (err)
                reject(err);
            return resolve(result);
        });
    });
};
exports.protectRoute = () => (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not Authorized' });
};
