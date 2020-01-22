const NodeWebcam = require('node-webcam');

const defaultOpts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: 'jpeg',
  device: false,
  callbackReturn: 'location',
  verbose: false
};

function createWebcam(opts) {
  return NodeWebcam.create(opts);
}

function captureImage(webcam, filename, callback) {
  webcam.capture(filename, callback);
}

module.exports.defaultOpts = defaultOpts;
module.exports.createWebcam = createWebcam;
module.exports.captureImage = captureImage;
