import "./style.css";
import { createApplication } from "./createApplication";
import { createRaycasterLine } from "./createRaycasterLine";
import { createSphere } from "./createSphere";
import { findIntersection } from "./findIntersection";
import { addEvents } from "./addEvents";
import { createCylinder } from "./createCylinder";
import { createCylSphere } from "./createCylSphere";

const { scene, camera, renderer } = createApplication();
const { sphere } = createSphere();
const { cylinder } = createCylinder();
const { sphereCylinderCsg, halfWidth, center } = createCylSphere(
	sphere,
	cylinder,
);

const { line, linePositions } = createRaycasterLine(-5, halfWidth, center);

// scene.add(sphere);
// scene.add(cylinder);
scene.add(line);
scene.add(sphereCylinderCsg);

const intersection = findIntersection(linePositions, sphereCylinderCsg);

if (intersection?.intersectionSphere) {
	scene.add(intersection.intersectionSphere);
}

if (intersection?.raycaster) {
	addEvents(
		intersection.raycaster,
		sphereCylinderCsg,
		line,
		linePositions,
		scene,
	);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
