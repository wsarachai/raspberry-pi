const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
let stopBlinking = false;

const blinkled = _ => {
  if (stopBlinking) {
    led.write(0);
    return led.unexport();
  }
  led.read()
    .then(value => led.write(value ^ 1))
    .then(_ => setTimeout(blinkled, 200))
    .catch(err => console.log(err));
};

blinkled();

setTimeout(_ => stopBlinking = true, 5000);

