require("dotenv").config();

const { defaultOpts, createWebcam, captureImage } = require("./webcam");
const { createClient, sendAlert } = require("./twilio");
const { loadImage, saveImage, detectFaces, drawDetection } = require("./face");

const webcam = createWebcam(defaultOpts);

const twilioClient = createClient(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function detect() {
  captureImage(webcam, "capture", async (err, path) => {
    const image = await loadImage(path);
    const detections = await detectFaces(image);

    if (detections.length > 0) {
      const detection = await drawDetection(image, detections);

      await saveImage(
        `${__dirname}/images/detection.jpg`,
        detection.toBuffer("image/jpeg")
      );

      await sendAlert(twilioClient, {
        from: `whatsapp:+${process.env.TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:+${process.env.TWILIO_WHATSAPP_TO}`,
        body: "There's someone at your laptop!",
        mediaUrl: `${process.env.NGROK_URL}/detection.jpg`
      });
    }
  });
}

module.exports.detect = detect;
