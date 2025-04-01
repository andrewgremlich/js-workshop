console.info("image bitmap with offscreen canvas");
const offscreen2 = new OffscreenCanvas(256, 256);
const ctx2 = offscreen2.getContext("2d");

// NOTE: offscreen canvas doesn't have context attributes...

// const contextAttributes = ctx2?.getContextAttributes();
// console.log('Will Read Frequently:', contextAttributes.willReadFrequently);

// Load the image
const img = new Image();
img.src = "/gnome_carrot.png";
img.onload = async () => {
	console.log("Image loaded");
	// Create an ImageBitmap from the loaded image
	const imageBitmap = await createImageBitmap(img);

	// Draw the ImageBitmap onto the canvas
	ctx2?.drawImage(imageBitmap, 0, 0);

	const blobbed2 = await offscreen2.convertToBlob();

	if (blobbed2) {
		const url2 = URL.createObjectURL(blobbed2);
		const link2 = document.createElement("a");
		link2.href = url2;
		link2.download = "offscreen-canvas-image-bitmap.png";
		link2.click();
		URL.revokeObjectURL(url2);
	}
};
