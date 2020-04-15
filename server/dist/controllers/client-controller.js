"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.indexFileHandler = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'static', 'index.html'));
};
exports.redirectHandler = (req, res) => {
    res.redirect('/');
};
