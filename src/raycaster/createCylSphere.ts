import * as THREE from "three";
import { CSG } from "three-csg-ts";

export function createCylSphere(cylinder: THREE.Mesh, sphere: THREE.Mesh) {
	const sphereCylinderCsg = CSG.union(sphere, cylinder);
	const boundingBox = new THREE.Box3().setFromObject(sphereCylinderCsg);
	const size = boundingBox.getSize(new THREE.Vector3());
	const center = boundingBox.getCenter(new THREE.Vector3());

	return { sphereCylinderCsg, halfWidth: size.x / 2, center };
}
