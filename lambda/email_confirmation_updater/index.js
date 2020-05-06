const mysql = require('mysql2');

exports.handler = (event, context, callback) => {
  const DB_CONNECTION = mysql.createConnection(process.env.JAWSDB_URL);
  console.log(event, context);
  DB_CONNECTION.query(
    `UPDATE Users SET email_confirmed=true WHERE id=${event.queryStringParameters.id}`,
    (error, results) => {
      if (error) {
        DB_CONNECTION.end();
        callback(error, {
          isBase64Encoded: false,
          statusCode: 404,
          body: 'Failed to Confirm',
        });
      }
      DB_CONNECTION.end();
      callback(undefined, {
        isBase64Encoded: false,
        statusCode: 200,
        body: 'Email Confirmed. Thank You.',
      });
    }
  );
};
