import DB_CONNECTION from '../config/connection';
import { RowDataPacket, QueryError } from 'mysql2';

export const makeQuery = (
  query: string,
  args: any[] = []
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
