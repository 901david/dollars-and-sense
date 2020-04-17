"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const file_logger_1 = require("./common/file-logger");
const graphql_setup_1 = require("./config/graphql-setup");
const NODE_ENV = process.env.NODE_ENV || 'development';
const app = express_1.default();
const serverLogger = new file_logger_1.ServerLogger(app, NODE_ENV);
const PORT = process.env.PORT || 5005;
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist/static')));
app.use(express_1.default.json());
app.use(body_parser_1.default({ extended: true }));
// setUpAuthentication(app);
graphql_setup_1.setupGraphQl(app);
serverLogger.setupLoggingByEnv();
app.use(routes_1.mainRouter);
app.listen(PORT, (...err) => {
    if (err.length > 0)
        throw err;
    console.info(`Success! Started on Port: ${PORT}\n******************************************************`);
});
