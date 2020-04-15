"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp } = winston_1.format;
const console_logger_wrapper_1 = require("./console-logger-wrapper");
const file_logger_1 = require("./file-logger");
const myLoggerTransformFn = (data) => {
    const { timestamp, label, level, message, type } = data;
    return `[${label}] ${level}: ${message} - ${type} - ${timestamp} `;
};
exports.logRequests = (req, res, next) => {
    console.log(Object.keys(req).toString());
    console.log(Object.keys(req));
    if (process.env.NODE_ENV !== 'production')
        console_logger_wrapper_1.wrappedLogger('info', myLoggerTransformFn(Object.assign({
            label: 'Server Logs',
            level: 'info',
            message: req.url,
            timestamp: new Date().toISOString(),
            type: req.method,
        })));
    else
        file_logger_1.logger.info(req.url);
    next();
};
