import * as THREE from "three";

function sliceByLightsaber(model: THREE.Mesh) {
	const boundingBox = new THREE.Box3().setFromObject(model);
	const center = boundingBox.getCenter(new THREE.Vector3());
	const pointGatherer: THREE.Vector3[] = [];

	for (let z = boundingBox.min.z; z < boundingBox.max.z; z++) {
		for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
			const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
			const raycaster = new THREE.Raycaster(
				new THREE.Vector3(center.x, z, center.z),
				direction,
			);
			const intersects = raycaster.intersectObject(model);

			if (intersects.length > 0) {
				const intersection = intersects[0].point;
				pointGatherer.push(intersection);
			}
		}
	}

	// NOTE: For debugging purposes
	// setInterval(() => {
	// 	const sphere = new THREE.Mesh(
	// 		new THREE.SphereGeometry(0.1),
	// 		new THREE.MeshBasicMaterial({ color: 0x0000ff }),
	// 	);
	// 	sphere.position.copy(pointGatherer[0]);

	// 	model.parent?.add(sphere);
	// 	pointGatherer.shift();
	// }, 200);

	const gcode = generateGCode(pointGatherer);
	downloadGCode(gcode);
}

export { sliceByLightsaber as sliceByRaycaster };

function generateGCode(points: THREE.Vector3[]): string {
	let gcode = "G21 ; Set units to millimeters\n";
	gcode += "G90 ; Use absolute positioning\n";
	gcode += "G1 Z5 F5000 ; Lift\n";

	for (const point of points) {
		gcode += `G1 X${point.x.toFixed(2)} Y${point.z.toFixed(2)} Z${point.y.toFixed(2)} F1500\n`;
	}

	gcode += "G1 Z5 F5000 ; Lift\n";
	gcode += "M30 ; End of program\n";

	return gcode;
}

function downloadGCode(gcode: string, filename = "output.gcode") {
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
