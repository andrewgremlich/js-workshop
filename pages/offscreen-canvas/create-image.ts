const offscreen = new OffscreenCanvas(256, 256);
const ctx = offscreen.getContext("2d");

if (ctx) {
  ctx.fillStyle = "red"; // Set the fill color to red
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.fill();
}

const blobbed = await offscreen.convertToBlob();

if (blobbed) {
  const url = URL.createObjectURL(blobbed);
  const link = document.createElement("a");
  link.href = url;
  link.download = "offscreen-canvas-image.png";
  link.click();
  URL.revokeObjectURL(url);
}
