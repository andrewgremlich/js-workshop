import * as THREE from "three";

function flipVerticalAxis(currentAxis: "y" | "z"): "y" | "z" {
	return currentAxis === "y" ? "z" : "y";
}

export function generateGCode(
	pointGatherer: THREE.Vector3[][],
	verticalAxis: "y" | "z" = "y",
): string {
	let gcode = "G21 ; Set units to millimeters\n";
	gcode += "G90 ; Use absolute positioning\n";
	gcode += "G1 Z5 F5000 ; Lift\n";

	for (const pointLevel of pointGatherer) {
		for (const point of pointLevel) {
			const flipHeight = flipVerticalAxis(verticalAxis);
			gcode += `G1 X${point.x.toFixed(2)} Y${point[flipHeight].toFixed(2)} Z${point[verticalAxis].toFixed(2)} F1500\n`;
		}
	}

	gcode += "G1 Z5 F5000 ; Lift\n";
	gcode += "M30 ; End of program\n";

	return gcode;
}

function addPoint(point: THREE.Vector3, model: THREE.Mesh, color = 0x0000ff) {
	const sphere = new THREE.Mesh(
		new THREE.SphereGeometry(0.1),
		new THREE.MeshBasicMaterial({ color }),
	);
	sphere.position.copy(point);

	model.parent?.add(sphere);
}

export function downloadGCode(gcode: string, filename = "output.gcode") {
	const blob = new Blob([gcode], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

class SliceByRaycasterError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "SliceByRaycasterError";
	}
}

function sliceByLightsaber(
	model: THREE.Mesh,
	options: {
		verticalAxis?: "y" | "z";
		layerHeight?: number;
		segments?: number;
		incrementHeight?: boolean;
		debug?: boolean;
	} = {},
) {
	const {
		verticalAxis = "y",
		layerHeight = 1,
		segments = 100,
		incrementHeight = true,
		debug = false,
	} = options;

	if (layerHeight <= 0) {
		throw new SliceByRaycasterError("Layer height must be greater than 0.");
	}

	if (segments <= 0) {
		throw new SliceByRaycasterError("Segments must be greater than 0.");
	}

	if (verticalAxis !== "y" && verticalAxis !== "z") {
		throw new SliceByRaycasterError(
			"Vertical axis must be either 'y' or 'z'.",
		);
	}

	const boundingBox = new THREE.Box3().setFromObject(model);
	const center = boundingBox.getCenter(new THREE.Vector3());
	const pointGatherer: THREE.Vector3[][] = [];
	const angleIncrement = (Math.PI * 2) / segments;

	for (
		let heightPosition = boundingBox.min[verticalAxis];
		heightPosition < boundingBox.max[verticalAxis];
		heightPosition += layerHeight
	) {
		const pointLevel = [];

		for (let angle = 0; angle < Math.PI * 2; angle += angleIncrement) {
			const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
			const adjustedHeight = incrementHeight
				? heightPosition + (angle / (Math.PI * 2)) * layerHeight
				: heightPosition;
			const raycaster = new THREE.Raycaster(
				new THREE.Vector3(center.x, adjustedHeight, center.z),
				direction,
			);
			const intersects = raycaster.intersectObject(model);

			if (intersects.length > 0) {
				const intersection = intersects[0].point;
				pointLevel.push(intersection);

				// NOTE: This is a check to see if there is too much overhang.
				// const lastPointAccess = pointLevel.length - 1;
				// const lastLevelAccess = pointGatherer.length - 1;

				// const pointOneLevelDown =
				// 	pointGatherer[lastLevelAccess]?.[lastPointAccess];
				// const lastInsertedPoint = pointLevel[lastPointAccess];

				// const oneLevelDownDistanceFromZero = pointOneLevelDown?.distanceTo(
				// 	new THREE.Vector3(pointOneLevelDown.x, pointOneLevelDown.y, 0),
				// );
				// const lastInsertedDistanceFromZero = lastInsertedPoint.distanceTo(
				// 	new THREE.Vector3(lastInsertedPoint.x, lastInsertedPoint.y, 0),
				// );
				// const differenceOfPoints =
				// 	lastInsertedDistanceFromZero - oneLevelDownDistanceFromZero;

				// if (differenceOfPoints > 1) {
				// 	//TODO: the `1` is a magic number, it should be a parameter.
				// 	for (let i = 1; i <= Math.ceil(differenceOfPoints); i++) {
				// 		const levelAccess = pointGatherer.length - i;
				// 		const pointModifier = pointGatherer[levelAccess][lastPointAccess];
				// 		const centerPointAtHeight = new THREE.Vector3(
				// 			center.x,
				// 			pointModifier.y,
				// 			center.z,
				// 		);
				// 		const vector = new THREE.Vector3().subVectors(
				// 			pointModifier,
				// 			centerPointAtHeight,
				// 		);
				// 		const scaleVector = vector.multiplyScalar(i * 0.1);
				// 		const newPoint = pointModifier.clone().add(scaleVector);

				// 		console.log({
				// 			newPoint,
				// 			pointModifier,
				// 			centerPointAtHeight,
				// 		});

				// 		addPoint(newPoint, model, 0x0000ff);
				// 		addPoint(pointModifier, model, 0x00ff00);
				// 		addPoint(centerPointAtHeight, model, 0x00ff00);

				// 		pointGatherer[levelAccess][lastPointAccess] = newPoint;
				// 	}
				// }
			}
		}

		pointGatherer.push(pointLevel);
	}

	if (debug) {
		for (const pointlevel of pointGatherer) {
			for (const point of pointlevel) {
				addPoint(point, model);
			}
		}
	}

	return pointGatherer;
}

export { sliceByLightsaber as sliceByRaycaster };
export default sliceByLightsaber;
