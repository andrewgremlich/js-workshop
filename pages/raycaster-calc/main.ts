import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./styles.css";

function createTriangle() {
	const triangleGeometry = new THREE.BufferGeometry();
	const triangleMaterial = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		side: THREE.DoubleSide,
	});
	const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
	const vertices = new Float32Array([-2.5, 0, 0, 2.5, 0, 0, 0, 5, 0]);
	triangleGeometry.setAttribute(
		"position",
		new THREE.BufferAttribute(vertices, 3),
	);
	triangleMesh.geometry.attributes.position.needsUpdate = true;

	return triangleMesh;
}

function createLine() {
  const points = [
    new THREE.Vector3(-1, 0, 5),
    new THREE.Vector3(1, 3, -5),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const line = new THREE.Line(geometry, material);
  return line;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer();
const grid = new THREE.GridHelper(20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

ambientLight.position.set(0, 0, 0);
new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(grid);
scene.add(ambientLight);
scene.add(directionalLight);

camera.position.set(0, 5, 25);
camera.lookAt(0, 0, 0);

window.addEventListener("resize", () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

const triangleMesh = createTriangle();
scene.add(triangleMesh);

const line = createLine();
scene.add(line);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
