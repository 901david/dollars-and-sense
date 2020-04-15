"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_logger_1 = require("./file-logger");
exports.wrappedLogger = (type, message) => {
    console.log(`${type}: - ${message}`);
    file_logger_1.logger[type](message);
};
