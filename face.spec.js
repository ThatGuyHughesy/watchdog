const { describe, it } = require('mocha');
const { assert } = require('chai');

const { loadImage, detectFaces } = require('./face');

describe('Face', () => {
  it('Detected', async () => {
    const image = await loadImage('resources/pass.jpg');
    const detections = await detectFaces(image);
    assert.isNotEmpty(detections);
  });

  it('Not Detected', async () => {
    const image = await loadImage('resources/fail.jpg');
    const detections = await detectFaces(image);
    assert.isEmpty(detections);
  });
});
