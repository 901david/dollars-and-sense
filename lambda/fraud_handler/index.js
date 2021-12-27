const axios = require('axios');
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
    const { id } = event.queryStringParameters;

    const [user] = await makeQuery(
      `SELECT user_id, id FROM UsersTokens WHERE user_token="${id}"`
    );

    if (user) {
      const { user_id, id } = user;
      const emailData = {
        to: 'vdavidhammond@gmail.com',
        from: 'fraud@dollars-and-sense.net',
        subject: 'Account signed up for without permission',
        html: `
      <div>
      <h3>Potential Fraud Reported</h3>
      <p>User with the id of ${user_id} is reporting they received a confirmation email address, but they did not sign up for services</p>
      </div>
      `,
      };
      await axios.post(process.env.API_GATEWAY_ENDPOINT, emailData, {
        headers: { 'x-api-key': process.env.API_GATEWAY_SECRET },
      });
      DB_CONNECTION.end();
      callback(undefined, {
        isBase64Encoded: false,
        statusCode: 200,
        body: 'We have notified our fraud team. Thank You.',
      });
    } else {
      DB_CONNECTION.end();
      callback(undefined, {
        isBase64Encoded: false,
        statusCode: 404,
        body: 'Token is expired',
      });
    }
  } catch (error) {
    DB_CONNECTION.end();
    callback(error, {
      isBase64Encoded: false,
      statusCode: 404,
      body: 'Failed to notify fraud team',
    });
  }
};
