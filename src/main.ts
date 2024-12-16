import "./style.css";
import { createApplication } from "./createApplication";
import { createSphere } from "./createSphere";
import { addRaycasterLineYPosition, createRaycasterLine, rotateRaycasterLineX, rotateRaycasterLineY, rotateRaycasterLineZ, subtractRaycasterLineYPosition } from "./createRaycasterLine";
import { findIntersection } from "./findIntersection";

const { scene, camera, renderer } = createApplication();
const { sphere, sphereRadius } = createSphere();
const { line, linePositions } = createRaycasterLine(-5, sphereRadius);

scene.add(sphere);
scene.add(line);

const intersection = findIntersection(linePositions, sphere);

if (intersection?.intersectionSphere) {
  scene.add(intersection.intersectionSphere);
}

document.getElementById('rotate-x')?.addEventListener('click', () => {
  rotateRaycasterLineX(line, Math.PI / 10);

  const newIntersection = findIntersection(linePositions, sphere);

  if (newIntersection?.intersectionSphere) {
    scene.add(newIntersection.intersectionSphere);
  }
})

document.getElementById('rotate-y')?.addEventListener('click', () => {
  rotateRaycasterLineY(line, Math.PI / 10);

  const newIntersection = findIntersection(linePositions, sphere);

  if (newIntersection?.intersectionSphere) {
    scene.add(newIntersection.intersectionSphere);
  }
});

document.getElementById('rotate-z')?.addEventListener('click', () => {
  rotateRaycasterLineZ(line, Math.PI / 10);

  const newIntersection = findIntersection(linePositions, sphere);

  if (newIntersection?.intersectionSphere) {
    scene.add(newIntersection.intersectionSphere);
  }
})

document.getElementById('increase-y')?.addEventListener('click', () => {
  addRaycasterLineYPosition(line, 10);

  const newIntersection = findIntersection(linePositions, sphere);

  if (newIntersection?.intersectionSphere) {
    scene.add(newIntersection.intersectionSphere);
  }
})

document.getElementById('decrease-y')?.addEventListener('click', () => {
  subtractRaycasterLineYPosition(line, -10);

  const newIntersection = findIntersection(linePositions, sphere);

  if (newIntersection?.intersectionSphere) {
    scene.add(newIntersection.intersectionSphere);
  }
})

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
