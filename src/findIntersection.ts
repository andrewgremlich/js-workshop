import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const intersects: THREE.Intersection[] = [];

// Function to find intersections
export function findIntersection(
	linePositions: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
	intersectingObject: THREE.Mesh,
) {
	const line3 = new THREE.Line3(
		new THREE.Vector3().fromBufferAttribute(linePositions, 0),
		new THREE.Vector3().fromBufferAttribute(linePositions, 1),
	);
	const direction = new THREE.Vector3()
		.subVectors(line3.end, line3.start)
		.normalize();

	raycaster.set(line3.start, direction);
	intersects.length = 0;
	intersects.push(...raycaster.intersectObject(intersectingObject));
	if (intersects.length > 0) {
		const intersectionPoint = intersects[0].point;

		const intersectionGeometry = new THREE.SphereGeometry(0.1);
		const intersectionMaterial = new THREE.MeshStandardMaterial({
			color: 0x00ff00,
		});
		const intersectionSphere = new THREE.Mesh(
			intersectionGeometry,
			intersectionMaterial,
		);

		intersectionSphere.position.copy(intersectionPoint);

		return { intersectionSphere, intersectionPoint, raycaster };
	}

	console.log("No intersection");
	return null;
}
