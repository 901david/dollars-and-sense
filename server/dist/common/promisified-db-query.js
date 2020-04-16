"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../config/connection"));
exports.makeQuery = (query, args = []) => {
    return new Promise((resolve, reject) => {
        connection_1.default.query(query, args, (err, results) => {
            if (err)
                reject(err);
            resolve(results);
        });
    });
};
