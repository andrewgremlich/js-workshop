// offload a canvas rendering task to a web worker for performance optimization
self.onmessage = async (evt) => {
	const canvas = evt.data.canvas;

	const ctx = canvas.getContext("2d");

	if (ctx) {
		ctx.fillStyle = "red"; // Set the fill color to red
		ctx.arc(128, 128, 100, 0, Math.PI * 2);
		ctx.fill();
	}
};
