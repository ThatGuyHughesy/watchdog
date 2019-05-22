const twilio = require("twilio");

function createClient(accountSid, authToken) {
  return twilio(accountSid, authToken);
}

async function sendAlert(client, message) {
  client.messages.create(message);
}

module.exports.createClient = createClient;
module.exports.sendAlert = sendAlert;
