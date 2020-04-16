import DB_CONNECTION from './connection';
import { RowDataPacket, QueryError } from 'mysql2';
import { ExpressHandlerCB } from '../models/express-handler-cb';

const mapKeys = (data: Object) => {
  return Object.keys(data).map(key => {
    return `${key}="${data[key as keyof Object]}"`;
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

  static update<
    T extends { [key: string]: string | number },
    U extends Array<Object>
  >(tableName: string, conditions: T, valuesToUpdate: U, cb: ExpressHandlerCB) {
    const mappedConditions = mapKeys(conditions);
    const mappedValues = mapKeys(valuesToUpdate);

    DB_CONNECTION.query(
      `UPDATE ${tableName} WHERE ${mappedConditions.join(
        ' AND '
      )} SET ${mappedValues.join(' AND ')})}`,
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

  static delete<U extends Array<Object>>(
    tableName: string,
    conditions: U,
    cb: ExpressHandlerCB
  ) {
    const mappedConditions = mapKeys(conditions);

    DB_CONNECTION.query(
      `DELETE FROM ${tableName} WHERE ${mappedConditions.join(' AND ')}`,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) throw err;
        cb(results);
      }
    );
  }
}
