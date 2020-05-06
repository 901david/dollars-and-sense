const mysql = require('mysql2');
const moment = require('moment');
const axios = require('axios');

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
    const tokenedUsers = await makeQuery(`SELECT * FROM UsersTokens`);
    const removals = [];

    tokenedUsers.forEach(user => {
      console.log(user);
      if (moment(user.created_at).diff(moment(), 'days') >= 1) {
        removals.push(user.id);
      }
    });

    removals.forEach(async id => {
      await makeQuery(`DELETE FROM UsersTokens WHERE id=${id}`);
    });

    const emailData = {
      to: 'vdavidhammond@gmail.com',
      from: 'cron@dollars-and-sense.net',
      subject: 'Cleaned Tokens',
      html: `
      <div>
      <h3>Cleaned Tokens</h3>
      <p>Following userId's had tokens cleaned by Cron Job</p>
      <p>${removals.join(', ')}</p>
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
      body:
        'Tokens have been cleaned, proper people have been notified. Thank You.',
    });
  } catch (error) {
    const emailData = {
      to: 'vdavidhammond@gmail.com',
      from: 'cron@dollars-and-sense.net',
      subject: 'Failed to clean tokens',
      html: `
      <div>
      <h3>Cleaning Tokens Failed</h3>
      <p>${error.toString()}</p>
      </div>
      `,
    };
    await axios.post(process.env.API_GATEWAY_ENDPOINT, emailData, {
      headers: { 'x-api-key': process.env.API_GATEWAY_SECRET },
    });
    DB_CONNECTION.end();
    callback(error, {
      isBase64Encoded: false,
      statusCode: 404,
      body: 'Failed to clean tokens.',
    });
  }
};
