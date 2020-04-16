"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client-controller");
const user_auth_controller_1 = require("../controllers/user-auth-controller");
exports.clientRouter = express_1.Router();
exports.clientRouter
    .get('/', client_controller_1.indexFileHandler)
    .get('/protected', user_auth_controller_1.protectRoute(), client_controller_1.indexFileHandler)
    .get('*', client_controller_1.redirectHandler);
