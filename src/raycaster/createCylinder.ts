import * as THREE from "three";

export function createCylinder() {
	const cylinderRadiusTop = 5;
	const cylinderRadiusBottom = 5;
	const cylinderHeight = 20;
	const radialSegments = 32;
	const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadiusTop, cylinderRadiusBottom, cylinderHeight, radialSegments);
	const cylinderMaterial = new THREE.MeshStandardMaterial({
		color: 0xff0000,
		wireframe: true,
		side: THREE.DoubleSide,
	});
	const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

	return { cylinder, cylinderRadiusTop, cylinderRadiusBottom, cylinderHeight, radialSegments };
}
