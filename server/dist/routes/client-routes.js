"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client-controller");
exports.clientRouter = express_1.Router();
exports.clientRouter.get('/', client_controller_1.indexFileHandler);
