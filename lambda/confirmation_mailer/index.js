const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: 'sandboxe88ea5e2e2e4488784939c3f354fa932.mailgun.org',
});

exports.handler = (event, context, callback) => {
  const { subject, text, to, from } = event;

  const data = {
    from,
    to,
    subject,
    text,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      callback(error, undefined);
    }
    callback(undefined, { status: 200, message: body.message });
  });
};
