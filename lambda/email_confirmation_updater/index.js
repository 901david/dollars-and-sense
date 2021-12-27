const mysql = require('mysql2');

exports.handler = async (event, context, callback) => {
  const DB_CONNECTION = mysql.createConnection(process.env.JAWSDB_URL);

  const makeQuery = (query, args = []) => {
    return new Promise((resolve, reject) => {
      DB_CONNECTION.query(query, args, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };

  try {
    const [user] = await makeQuery(
      `SELECT user_id, id FROM UsersTokens WHERE user_token="${event.queryStringParameters.id}"`
    );

    if (user) {
      const { user_id, id } = user;
      await makeQuery(
        `UPDATE Users SET email_confirmed=true WHERE id=${user_id}`
      );

      await makeQuery(`DELETE FROM UsersTokens WHERE id=${id}`);

      DB_CONNECTION.end();
      callback(undefined, {
        isBase64Encoded: false,
        statusCode: 200,
        body: 'Email Confirmed. Thank You.',
      });
    } else {
      DB_CONNECTION.end();
      callback(undefined, {
        isBase64Encoded: false,
        statusCode: 404,
        body: 'User token has expired',
      });
    }
  } catch (error) {
    DB_CONNECTION.end();
    callback(error, {
      isBase64Encoded: false,
      statusCode: 404,
      body: 'Failed to Confirm',
    });
  }
};
