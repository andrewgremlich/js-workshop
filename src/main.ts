import "./style.css";
import { createApplication } from "./createApplication";
import { createRaycasterLine } from "./createRaycasterLine";
import { createSphere } from "./createSphere";
import { findIntersection } from "./findIntersection";
import { addEvents } from "./addEvents";

const { scene, camera, renderer } = createApplication();
const { sphere, sphereRadius } = createSphere();
const { line, linePositions } = createRaycasterLine(-5, sphereRadius);

scene.add(sphere);
scene.add(line);

const intersection = findIntersection(linePositions, sphere);

if (intersection?.intersectionSphere) {
	scene.add(intersection.intersectionSphere);
}

if (intersection?.raycaster) {
	addEvents(intersection.raycaster, sphere, line, linePositions, scene);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
