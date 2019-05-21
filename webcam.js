const NodeWebcam = require("node-webcam");

const opts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false
};

const Webcam = NodeWebcam.create(opts);

function capture(filename, callback) {
  Webcam.capture(filename, callback);
}

module.exports.capture = capture;
