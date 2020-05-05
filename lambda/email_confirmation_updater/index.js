const mysql = require('mysql2');

exports.handler = (event, context, callback) => {
  const DB_CONNECTION = mysql.createConnection(process.env.JAWSDB_URL);

  DB_CONNECTION.query(
    `UPDATE Users SET email_confirmed=true WHERE id=${event.id}`,
    (error, results) => {
      if (error) {
        DB_CONNECTION.end();
        callback(error, undefined);
      }
      DB_CONNECTION.end();
      callback(undefined, { status: 200, message: 'Email Confirmed.' });
    }
  );
};
