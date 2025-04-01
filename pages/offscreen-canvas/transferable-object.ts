// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
import OffscreenWorker from "./offscreen-worker?worker";

const htmlCanvas = document.querySelector("canvas");

if (!htmlCanvas) {
	throw new Error("Canvas not found");
}

// const ctx = htmlCanvas.getContext("2d");

// transferable-object.ts:17 Uncaught InvalidStateError: Failed to execute 'transferControlToOffscreen' on 'HTMLCanvasElement': Cannot transfer control from a canvas that has a rendering context.
// if (ctx) {
// 	ctx.fillStyle = "red"; // Set the fill color to red
// 	ctx.arc(128, 128, 100, 0, Math.PI * 2);
// 	ctx.fill();
// }

const offscreen = htmlCanvas.transferControlToOffscreen();

if (!offscreen) {
	throw new Error("Offscreen canvas could not be created.");
}

const worker = new OffscreenWorker();
worker.postMessage({ canvas: offscreen }, [offscreen]); //transfer rather than clone

setTimeout(() => {
	htmlCanvas.toBlob((blob) => {
		if (blob) {
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "visible-canvas-image.png";
			link.click();
			URL.revokeObjectURL(url);
		} else {
			console.error("Failed to create a Blob from the canvas.");
		}
	});
}, 1000);
