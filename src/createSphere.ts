import * as THREE from "three";

export function createSphere() {
	const sphereRadius = 10;
	const sphereGeometry = new THREE.SphereGeometry(sphereRadius);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 0xff0000,
		wireframe: true,
		side: THREE.DoubleSide,
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	return { sphere, sphereRadius };
}
