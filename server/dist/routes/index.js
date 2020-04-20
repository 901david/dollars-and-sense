"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_routes_1 = require("./client-routes");
const user_routes_1 = require("./user-routes");
const user_auth_routes_1 = require("./user-auth-routes");
exports.mainRouter = express_1.Router();
exports.mainRouter.use('/api/users', user_routes_1.userRouter);
exports.mainRouter.use('/api/auth', user_auth_routes_1.userAuthRouter);
exports.mainRouter.get('/api/*', (req, res) => {
    res.status(500).json({ error: 'API Route does not exist' });
});
exports.mainRouter.use(client_routes_1.clientRouter);
