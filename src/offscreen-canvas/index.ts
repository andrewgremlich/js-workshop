import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } from "three";

const scene = new Scene();
const camera = new PerspectiveCamera(
	75, // Field of view
	256 / 256, // Aspect ratio (width / height)
	0.1, // Near clipping plane
	1000, // Far clipping plane
);
const renderer = new WebGLRenderer({
	// Create an offscreen canvas
	// canvas: new OffscreenCanvas(256, 256) // This will be used for rendering
});
const ambientLight = new AmbientLight(0xffffff, 1); // Soft white light
renderer.setSize(256, 256); // Set the size of the renderer
renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for better quality

// console.log("This is an example of using OffscreenCanvas");

scene.add(ambientLight);
document.getElementById("canvas-container")?.appendChild(renderer.domElement);

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

render();
