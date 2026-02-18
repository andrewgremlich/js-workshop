import * as JoyCon from 'joy-con-webhid';

console.log(JoyCon);

// For the initial pairing of the Joy-Cons. They need to be paired one by one.
// Once paired, Joy-Cons will be reconnected to on future page loads.
document.querySelector('.connect')?.addEventListener('click', async () => {
  // `JoyCon.connectJoyCon()` handles the initial HID pairing.
  // It keeps track of connected Joy-Cons in the `JoyCon.connectedJoyCons` Map.
  await JoyCon.connectJoyCon();
});

// Joy-Cons may sleep until touched and fall asleep again if idle, so attach
// the listener dynamically, but only once.
setInterval(async () => {
  for (const joyCon of JoyCon.connectedJoyCons.values()) {
    
    if (joyCon.eventListenerAttached) {
      continue;
    }

    console.dir(joyCon);

    // Open the device and enable standard full mode and inertial measurement
    // unit mode, so the Joy-Con activates the gyroscope and accelerometers.
    await joyCon.open();
    await joyCon.enableStandardFullMode();
    await joyCon.enableIMUMode();
    await joyCon.enableVibration();

    // Rumble.
    // await joyCon.rumble(600, 600, 0.5);

    // Listen for HID input reports.
    joyCon.addEventListener('hidinput', ({ detail }) => {
        const {
          actualAccelerometer: accelerometer,
          buttonStatus: buttons,
          actualGyroscope: gyroscope,
          actualOrientation: orientation,
          actualOrientationQuaternion: orientationQuaternion,
          ringCon,
        } = detail;

        const {a,b,x,y} = buttons;

      console.log(y);
    });

    joyCon.eventListenerAttached = true;
  }
}, 2000);