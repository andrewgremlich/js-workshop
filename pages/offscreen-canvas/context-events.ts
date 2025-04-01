const offscreen = new OffscreenCanvas(256, 256);
const ctx = offscreen.getContext("2d");

if (ctx) {
  ctx.fillStyle = "red"; // Set the fill color to red
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.fill();
}

offscreen.addEventListener("contextlost", (event) => {
  console.log("Context lost:", event);
});

offscreen.addEventListener("contextrestored", (event) => {
  console.log("Context restored:", event);
  // call to redrawCanvas() or similar
});

// if the hardware has a problem...
// Simulate context lost
const contextLostEvent = new Event("contextlost");
offscreen.dispatchEvent(contextLostEvent);

// Simulate context restored
const contextRestoredEvent = new Event("contextrestored");
offscreen.dispatchEvent(contextRestoredEvent);
