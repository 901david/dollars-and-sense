const axios = require('axios');

exports.handler = async (event, context, callback) => {
  try {
    const { id } = event.queryStringParameters;

    const emailData = {
      to: 'vdavidhammond@gmail.com',
      from: 'fraud@dollars-and-sense.net',
      subject: 'Account signed up for without permission',
      html: `
    <div>
    <h3>Potential Fraud Reported</h3>
    <p>User with the id of ${id} is reporting they received a confirmation email address, but they did not sign up for services</p>
    </div>
    `,
    };
    await axios.post(process.env.API_GATEWAY_ENDPOINT, emailData, {
      headers: { 'x-api-key': process.env.API_GATEWAY_SECRET },
    });
    callback(undefined, {
      isBase64Encoded: false,
      statusCode: 200,
      body: 'We have notified our fraud team. Thank You.',
    });
  } catch (error) {
    callback(error, {
      isBase64Encoded: false,
      statusCode: 404,
      body: 'Failed to notify fraud team',
    });
  }
};
