const fs = require('fs');
const { describe, it } = require('mocha');
const { assert } = require('chai');

const { defaultOpts, createWebcam, captureImage } = require('./webcam');

const workingWebcam = createWebcam(defaultOpts);
const brokenWebcam = createWebcam({ device: 'broken' });

const removeWebcamCapture = path => {
  try {
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

describe('Webcam', () => {
  it('Captured', () => {
    captureImage(workingWebcam, 'test', (err, path) => {
      assert.typeOf(err, 'null');
      assert.ok(webcamCaptureExists(path));
      removeWebcamCapture(path);
    });
  });

  it('Not Captured', () => {
    captureImage(brokenWebcam, 'test', err => {
      assert.equal(err instanceof Error, true);
    });
  });
});
