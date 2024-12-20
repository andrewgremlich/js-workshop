import type * as THREE from "three";

import {
	sliceByRaycaster,
	generateGCode,
	downloadGCode,
} from "@/lib/sliceByRaycaster";

import {
	addRaycasterLineYPosition,
	rotateRaycasterLineX,
	rotateRaycasterLineY,
	rotateRaycasterLineZ,
	subtractRaycasterLineYPosition,
} from "./createRaycasterLine";
import { findIntersection } from "./findIntersection";

export function addEvents(
	raycaster: THREE.Raycaster,
	meshObject: THREE.Mesh,
	line: THREE.Line,
	linePositions: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
	scene: THREE.Scene,
) {
	document.getElementById("create-gcode")?.addEventListener("click", () => {
		if (!raycaster) {
			return;
		}

		const verticalAxis = "y";
		const points = sliceByRaycaster(meshObject, {
			verticalAxis,
			layerHeight: 1,
			segments: 100,
			incrementHeight: true,
			debug: import.meta.env.MODE === "development",
		});
		const gcode = generateGCode(points, verticalAxis);
		downloadGCode(gcode);
	});

	document.getElementById("rotate-x")?.addEventListener("click", () => {
		rotateRaycasterLineX(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, meshObject);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("rotate-y")?.addEventListener("click", () => {
		rotateRaycasterLineY(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, meshObject);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("rotate-z")?.addEventListener("click", () => {
		rotateRaycasterLineZ(line, Math.PI / 10);

		const newIntersection = findIntersection(linePositions, meshObject);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("increase-y")?.addEventListener("click", () => {
		addRaycasterLineYPosition(line, 10);

		const newIntersection = findIntersection(linePositions, meshObject);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});

	document.getElementById("decrease-y")?.addEventListener("click", () => {
		subtractRaycasterLineYPosition(line, -10);

		const newIntersection = findIntersection(linePositions, meshObject);

		if (newIntersection?.intersectionSphere) {
			scene.add(newIntersection.intersectionSphere);
		}
	});
}
