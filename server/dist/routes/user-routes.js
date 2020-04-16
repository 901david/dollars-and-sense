"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
exports.userRouter = express_1.Router();
exports.userRouter.route('/').get(user_controller_1.getUsers).post(user_controller_1.createUser);
exports.userRouter.route('/:id').put(user_controller_1.updateUsers);
