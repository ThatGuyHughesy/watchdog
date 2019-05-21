const fs = require("fs");
const { describe, it } = require("mocha");
const { assert } = require("chai");

const { capture } = require("./webcam");

const removeWebcamCapture = path => {
  try {
    console.log(path);
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
};

const webcamCaptureExists = path => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
    return false;
  }
};

describe("Webcam", () => {
  it("Captured", done => {
    capture("test", (err, path) => {
      assert.typeOf(err, "null");
      assert.ok(webcamCaptureExists(path));
      removeWebcamCapture(path);
      done();
    });
  });
});
