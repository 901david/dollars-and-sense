import { RowDataPacket, QueryError } from 'mysql2';

import DB_CONNECTION from './connection';
import { ExpressHandlerCB } from '../models/express-handler-cb';
import { makeQuery } from '../common/promisified-db-query';

const mapKeys = (data: Object) => {
  return Object.keys(data).map(key => {
    const isNum = isNaN(+data[key as keyof Object]) === false;
    const value = isNum
      ? +data[key as keyof Object]
      : data[key as keyof Object];

    return `${key}=${isNum ? value : `"${value}"`}`;
  });
};

export class orm {
  static async get(tableName: string, cb: ExpressHandlerCB) {
    try {
      const results = await makeQuery(`SELECT * FROM ${tableName}`);
      cb(results);
    } catch (err) {
      throw err;
    }
  }

  static async getOneByEmail(tableName: string, email: string) {
    return makeQuery(`SELECT * FROM ${tableName} WHERE email='${email}'`);
  }

  static async update<T extends Object, U extends Array<Object>>(
    tableName: string,
    conditions: T,
    valuesToUpdate: U,
    cb: ExpressHandlerCB
  ) {
    const mappedConditions = mapKeys(conditions);
    const mappedValues = mapKeys(valuesToUpdate);
    try {
      const results = await makeQuery(
        `UPDATE ${tableName} SET ${mappedValues.join(
          ', '
        )} WHERE ${mappedConditions.join(' AND ')}`
      );
      cb(results);
    } catch (err) {
      throw err;
    }
  }

  static async create<T extends Array<keyof U>, U extends Object>(
    tableName: string,
    columnsUpdated: T,
    valuesToUpdate: U,
    cb: ExpressHandlerCB
  ) {
    const mappedValues = Array.from(
      columnsUpdated,
      (column: keyof U) => `"${valuesToUpdate[column]}"`
    );

    try {
      const results = await makeQuery(
        `INSERT INTO ${tableName} (${columnsUpdated.join(
          ', '
        )}) VALUES (${mappedValues.join(', ')})`
      );
      cb(results);
    } catch (err) {
      throw err;
    }
  }

  static async delete(tableName: string, id: string, cb: ExpressHandlerCB) {
    try {
      const results = await makeQuery(
        `DELETE FROM ${tableName} WHERE id=${id}`
      );
      cb(results);
    } catch (err) {
      throw err;
    }
  }
}
