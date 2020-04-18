"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
exports.userRouter = express_1.Router();
exports.userRouter.route('/').get(user_controller_1.getUsers);
exports.userRouter.route('/:id').patch(user_controller_1.updateUser).delete(user_controller_1.deleteUser);
