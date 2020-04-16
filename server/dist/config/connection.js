"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
let DB_CONNECTION;
if (process.env.NODE_ENV === 'development') {
    DB_CONNECTION = mysql2_1.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'dollars_sense',
        password: '',
    });
}
else {
    DB_CONNECTION = mysql2_1.createConnection(process.env.JAWSDB_URL);
}
exports.default = DB_CONNECTION;
