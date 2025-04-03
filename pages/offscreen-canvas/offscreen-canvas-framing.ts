console.log("offscreen-canvas-framing");

const canvas = document.querySelector("canvas");

if (!canvas) {
	throw new Error("Canvas not found");
}

const ctx = canvas.getContext("bitmaprenderer");

const offscreen = new OffscreenCanvas(256, 256);
const offscreenCtx = offscreen.getContext("2d");

if (ctx && offscreenCtx) {
	const radius = 50;
	const centerX = offscreen.width / 2;
	const centerY = offscreen.height / 2;

	function drawFrame() {
		console.log("Drawing frame");

		const progress = Date.now();
		const angle = (progress / 1000) * (2 * Math.PI) / 60; // Divide into 60 segments

		if (offscreenCtx) {
			offscreenCtx.clearRect(0, 0, offscreen.width, offscreen.height);

			// Draw the circle
			offscreenCtx.beginPath();
			offscreenCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			offscreenCtx.strokeStyle = "black";
			offscreenCtx.lineWidth = 2;
			offscreenCtx.stroke();

			// Draw the ball
			const ballX = centerX + radius * Math.cos(angle);
			const ballY = centerY + radius * Math.sin(angle);
			offscreenCtx.beginPath();
			offscreenCtx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
			offscreenCtx.fillStyle = "red";
			offscreenCtx.fill();
		}


		// Transfer the offscreen canvas to a bitmap and draw it on the regular canvas
		const offscreenBitmap = offscreen.transferToImageBitmap();

		if (ctx) {
			ctx.transferFromImageBitmap(offscreenBitmap);
		}
	}

	setInterval(() => {
		drawFrame();
	}, 1000);
}
