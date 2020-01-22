require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const { MessagingResponse } = require('twilio').twiml;
const { CronJob } = require('cron');

const { detect } = require('./detect');

const app = express();
const twiml = new MessagingResponse();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/images`));

const detectionJob = new CronJob('*/30 * * * * *', () => {
  detect();
});

app.post('/incoming', (req, res) => {
  switch (req.body.Body.toLowerCase()) {
    case 'start':
      detectionJob.start();
      twiml.message('Watchdog is keeping your laptop safe!');
      break;
    case 'pause':
      detectionJob.stop();
      twiml.message('Watchdog is no longer keeping your laptop safe!');
      break;
    default:
      twiml.message('This command is invalid.');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.post('/status', (req, res) => {
  res.status(200).send('Available');
});

app.listen(process.env.SERVER_PORT);

ngrok.connect({
  proto: 'http',
  inspect: false,
  addr: process.env.SERVER_PORT,
  subdomain: process.env.NGROK_SUBDOMAIN,
  authtoken: process.env.NGROK_AUTH_TOKEN,
  region: process.env.NGROK_REGION,
  auth: `${process.env.NGROK_USERNAME}:${process.env.NGROK_PASSWORD}`
});
