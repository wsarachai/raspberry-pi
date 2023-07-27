const Gpio = require('onoff').Gpio;
const useLed = (led, value) => led.writeSync(value);
let stopBlinking = false;
let led;

if (Gpio.accessible) {
  led = new Gpio(17, 'out');
} else {
  led = {
    writeSync: value => {
      console.log(`virtual led now uses values: ${value}`);
    }
  };
}

const blinkled = _ => {
  if (stopBlinking) {
    useLed(led, 0);
    return led.unexport();
  }
  led.read()
    .then(value => useLed(led, value ^ 1))
    .then(_ => setTimeout(blinkled, 200))
    .catch(err => console.log(err));
};

blinkled();

setTimeout(_ => stopBlinking = true, 5000);

