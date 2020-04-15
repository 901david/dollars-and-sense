"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
exports.myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
exports.logger = winston_1.createLogger({
    format: combine(label({ label: 'Server Logs' }), timestamp(), exports.myFormat),
    transports: [new winston_1.transports.File({ filename: './logs/server-logs.log' })],
});
