import { createConnection, Connection } from 'mysql2';

let DB_CONNECTION: Connection;

if (process.env.NODE_ENV === 'development') {
  DB_CONNECTION = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dollars_sense',
    password: '',
  });
} else {
  DB_CONNECTION = createConnection(process.env.JAWSDB_URL!);
}

export default DB_CONNECTION;
