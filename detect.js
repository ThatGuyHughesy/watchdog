require('dotenv').config();

const { defaultOpts, createWebcam, captureImage } = require('./webcam');
const { createClient, sendAlert } = require('./twilio');
const { loadImage, saveImage, detectFaces, drawDetection } = require('./face');

const webcam = createWebcam(defaultOpts);

const twilioClient = createClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function detect() {
  captureImage(webcam, 'capture', async (error, path) => {
    const image = await loadImage(path);
    const detections = await detectFaces(image);

    if (detections.length > 0) {
      const detection = await drawDetection(image, detections);

      await saveImage(
        `${__dirname}/images/detection.jpg`,
        detection.toBuffer('image/jpeg')
      ).catch(err => {
        console.error(`Error saving image: \n${err}`);
      });

      await sendAlert(twilioClient, {
        from: `whatsapp:+${process.env.TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:+${process.env.TWILIO_WHATSAPP_TO}`,
        body: "There's someone at your laptop!",
        mediaUrl: `${process.env.NGROK_URL}/detection.jpg`
      }).catch(err => {
        console.error(`Error sending alert: \n${err}`);
      });
    }
  });
}

module.exports.detect = detect;
