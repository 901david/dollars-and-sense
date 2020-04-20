"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_auth_controller_1 = require("../controllers/user-auth-controller");
exports.userAuthRouter = express_1.Router();
exports.userAuthRouter.post('/register', user_auth_controller_1.handleUserRegister);
exports.userAuthRouter.post('/login', user_auth_controller_1.handleUserLogin);
exports.userAuthRouter.post('/logout', user_auth_controller_1.handleUserLogout);
