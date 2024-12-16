import type * as THREE from "three";
import {
	addRaycasterLineYPosition,
	rotateRaycasterLineX,
	rotateRaycasterLineY,
	rotateRaycasterLineZ,
	subtractRaycasterLineYPosition,
} from "./createRaycasterLine";
import { findIntersection } from "./findIntersection";
import { sliceByRaycaster } from "./sliceByRaycaster";

export function addEvents(
	raycaster: THREE.Raycaster,
	sphere: THREE.Mesh,
	line: THREE.Line,
	linePositions: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
	scene: THREE.Scene,
) {
	document.getElementById("create-gcode")?.addEventListener("click", () => {
		if (!raycaster) {
			return;
		}

		sliceByRaycaster(sphere);
	});

	document.getElementById("rotate-x")?.addEventListener("click", () => {
		rotateRaycasterLineX(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, sphere);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("rotate-y")?.addEventListener("click", () => {
		rotateRaycasterLineY(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, sphere);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("rotate-z")?.addEventListener("click", () => {
		rotateRaycasterLineZ(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, sphere);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("increase-y")?.addEventListener("click", () => {
		addRaycasterLineYPosition(line, 10);

		const newIntersection = findIntersection(linePositions, sphere);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("decrease-y")?.addEventListener("click", () => {
		subtractRaycasterLineYPosition(line, -10);

		const newIntersection = findIntersection(linePositions, sphere);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});
}
