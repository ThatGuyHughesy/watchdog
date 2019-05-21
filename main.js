const { capture } = require("./webcam");

function captured(err, path) {
  if (err) {
    console.error(err);
  }
  console.log(`Webcam captured: ${path}`);
}

capture("capture", captured);
