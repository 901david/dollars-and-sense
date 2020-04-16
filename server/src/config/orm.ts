import DB_CONNECTION from './connection';
import { RowDataPacket, QueryError } from 'mysql2';
import { ExpressHandlerCB } from '../models/express-handler-cb';

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
  static get(tableName: string, cb: ExpressHandlerCB) {
    DB_CONNECTION.query(
      `SELECT * FROM ${tableName}`,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) throw err;
        cb(results);
      }
    );
  }

  static update<T extends Object, U extends Array<Object>>(
    tableName: string,
    conditions: T,
    valuesToUpdate: U,
    cb: ExpressHandlerCB
  ) {
    console.log(tableName, conditions, valuesToUpdate);
    const mappedConditions = mapKeys(conditions);
    const mappedValues = mapKeys(valuesToUpdate);
    console.log(
      `UPDATE ${tableName} WHERE ${mappedConditions.join(
        ' AND '
      )} SET ${mappedValues.join(', ')}`
    );
    DB_CONNECTION.query(
      `UPDATE ${tableName} SET ${mappedValues.join(
        ', '
      )} WHERE ${mappedConditions.join(' AND ')}`,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) throw err;
        cb(results);
      }
    );
  }

  static create<T extends Array<keyof U>, U extends Object>(
    tableName: string,
    columnsUpdated: T,
    valuesToUpdate: U,
    cb: ExpressHandlerCB
  ) {
    const mappedValues = Array.from(
      columnsUpdated,
      (column: keyof U) => `"${valuesToUpdate[column]}"`
    );

    DB_CONNECTION.query(
      `INSERT INTO ${tableName} (${columnsUpdated.join(
        ', '
      )}) VALUES (${mappedValues.join(', ')})`,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) throw err;
        cb(results);
      }
    );
  }

  static delete(tableName: string, id: string, cb: ExpressHandlerCB) {
    DB_CONNECTION.query(
      `DELETE FROM ${tableName} WHERE id=${id}`,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) throw err;
        cb(results);
      }
    );
  }
}
