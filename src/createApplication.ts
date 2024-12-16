import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export function createApplication() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

  ambientLight.position.set(0, 0, 0);
  new OrbitControls(camera, renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(ambientLight);
  scene.add(directionalLight);

  camera.position.set(0, 5, 25);
  camera.lookAt(0, 0, 0);

  return { scene, camera, renderer };
}