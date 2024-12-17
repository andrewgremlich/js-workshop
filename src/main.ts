import "./style.css";
import { createApplication } from "./createApplication";
import { createRaycasterLine } from "./createRaycasterLine";
// import { createSphere } from "./createSphere";
import { findIntersection } from "./findIntersection";
import { addEvents } from "./addEvents";
import { createCylinder } from "./createCylinder";

const { scene, camera, renderer } = createApplication();
// const { sphere, sphereRadius } = createSphere();
const { cylinder, cylinderRadiusTop } = createCylinder();
const { line, linePositions } = createRaycasterLine(-5, cylinderRadiusTop);

scene.add(cylinder);
scene.add(line);

const intersection = findIntersection(linePositions, cylinder);

if (intersection?.intersectionSphere) {
	scene.add(intersection.intersectionSphere);
}

if (intersection?.raycaster) {
	addEvents(intersection.raycaster, cylinder, line, linePositions, scene);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
