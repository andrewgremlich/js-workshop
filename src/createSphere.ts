import * as THREE from "three";

export function createSphere() {
	const sphereRadius = 7.5;
	const sphereGeometry = new THREE.SphereGeometry(sphereRadius);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 0xff0000,
		wireframe: true,
		side: THREE.DoubleSide,
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

	sphere.position.set(5, 0, 0);

	sphere.updateMatrixWorld();

	return { sphere, sphereRadius };
}
