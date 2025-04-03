import * as THREE from "three";

import ThreeWorkerSnapshot from "./three-worker-snapshot?worker";

console.log("three-offscreen-snapshot");

const canvas = document.querySelector("canvas") as HTMLCanvasElement;

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	canvas.width / canvas.height,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer({ canvas });

// Create a sphere geometry and material
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
const sphere = new THREE.Mesh(geometry, material);

// Add the sphere to the scene
scene.add(sphere);

// Position the camera
camera.position.z = 5;

// CAN"T to be cause of the active rendering context!
// const offscreen = canvas.transferControlToOffscreen();

// const worker = new ThreeWorkerSnapshot();
// worker.postMessage({ canvas: offscreen }, [offscreen]); //transfer the offscreen canvas
