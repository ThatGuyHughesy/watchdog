require("dotenv").config();

const { defaultOpts, createWebcam, captureImage } = require("./webcam");
const { loadImage, saveImage, detectFaces, drawDetection } = require("./face");
const { createClient, sendAlert } = require("./twilio");

const webcam = createWebcam(defaultOpts);
const twilioClient = createClient(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

captureImage(webcam, "capture", async (err, path) => {
  const image = await loadImage(path);
  const detections = await detectFaces(image);

  if (detections.length > 0) {
    sendAlert(twilioClient, {
      from: `whatsapp:+${process.env.WHATSAPP_FROM}`,
      to: `whatsapp:+${process.env.WHATSAPP_TO}`,
      body: "There's someone at your laptop!"
    });

    const detection = await drawDetection(image, detections);
    saveImage("detection.jpg", detection.toBuffer("image/jpeg"));
  }
});
