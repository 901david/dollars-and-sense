"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const mapKeys = (data) => {
    return Object.keys(data).map(key => {
        return `${key}="${data[key]}"`;
    });
};
class orm {
    static get(tableName, cb) {
        connection_1.default.query(`SELECT * FROM ${tableName}`, (err, results) => {
            if (err)
                throw err;
            cb(results);
        });
    }
    static update(tableName, conditions, valuesToUpdate, cb) {
        const mappedConditions = mapKeys(conditions);
        const mappedValues = mapKeys(valuesToUpdate);
        connection_1.default.query(`UPDATE ${tableName} WHERE ${mappedConditions.join(' AND ')} SET ${mappedValues.join(' AND ')})}`, (err, results) => {
            if (err)
                throw err;
            cb(results);
        });
    }
    static create(tableName, columnsUpdated, valuesToUpdate, cb) {
        const mappedValues = Array.from(columnsUpdated, (column) => `"${valuesToUpdate[column]}"`);
        connection_1.default.query(`INSERT INTO ${tableName} (${columnsUpdated.join(', ')}) VALUES (${mappedValues.join(', ')})`, (err, results) => {
            if (err)
                throw err;
            cb(results);
        });
    }
    static delete(tableName, conditions, cb) {
        const mappedConditions = mapKeys(conditions);
        connection_1.default.query(`DELETE FROM ${tableName} WHERE ${mappedConditions.join(' AND ')}`, (err, results) => {
            if (err)
                throw err;
            cb(results);
        });
    }
}
exports.orm = orm;
