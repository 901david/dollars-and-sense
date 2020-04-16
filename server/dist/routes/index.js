"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_routes_1 = require("./client-routes");
exports.mainRouter = express_1.Router();
exports.mainRouter.get('/api/*', (req, res) => {
    res.status(500).json({ error: 'API Route does not exist' });
});
exports.mainRouter.use(client_routes_1.clientRouter);
