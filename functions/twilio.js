const twilio = require('twilio');

const accountSid = 'ACe59b10eb0cf91b4fb3b611777ce29c67';
const authToken = 'fc7393e4b276bd368fb8e0b00645d0b9';

module.exports = new twilio.Twilio(accountSid, authToken);
