import { RowDataPacket, QueryError } from 'mysql2';

import DB_CONNECTION from '../config/connection';

export const makeQuery = (
  query: string,
  args: string[] | { [key: string]: any } = []
): Promise<RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    DB_CONNECTION.query(
      query,
      args,
      (err: QueryError | null, results: RowDataPacket[]) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};
