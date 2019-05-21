const { defaultOpts, createWebcam, captureImage } = require("./webcam");
const { loadImage, saveImage, detectFaces, drawDetection } = require("./face");

const webcam = createWebcam(defaultOpts);

captureImage(webcam, "capture", async (err, path) => {
  const image = await loadImage(path);
  const detections = await detectFaces(image);
  const detection = drawDetection(image, detections);
  saveImage("detection.jpg", detection.toBuffer("image/jpeg"));
});
