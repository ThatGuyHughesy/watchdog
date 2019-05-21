require("@tensorflow/tfjs-node");

const canvas = require("canvas");
const fs = require("fs");
const faceapi = require("face-api.js");

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

const minConfidence = 0.5;

const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence
});

async function loadImage(filename) {
  return canvas.loadImage(filename);
}

function saveImage(filename, buf) {
  fs.writeFileSync(filename, buf);
}

async function detectFaces(image) {
  await faceDetectionNet.loadFromDisk("weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("weights");

  return faceapi
    .detectAllFaces(image, faceDetectionOptions)
    .withFaceLandmarks();
}

function drawDetection(image, detections) {
  const detection = faceapi.createCanvasFromMedia(image);

  faceapi.draw.drawDetections(detection, detections);
  faceapi.draw.drawFaceLandmarks(detection, detections);

  return detection;
}

module.exports.loadImage = loadImage;
module.exports.saveImage = saveImage;
module.exports.detectFaces = detectFaces;
module.exports.drawDetection = drawDetection;
