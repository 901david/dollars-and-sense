import DB_CONNECTION from '../../config/connection';
import { QueryError, RowDataPacket } from 'mysql2';

export const seedUsers = () =>
  DB_CONNECTION.query(
    'INSERT INTO Users (user_name, email, user_password) VALUES ("Bob", "Bob@gmail.com", "dasdas6d7asd67as6d")',
    (err: QueryError, results: RowDataPacket[]) => {
      if (err) throw err;
      console.log(results);
    }
  );
