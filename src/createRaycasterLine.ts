import * as THREE from "three";

export function createRaycasterLine(yScanHeight: number, lineLength: number) {
  const points = [
    new THREE.Vector3(0, yScanHeight, 0),
    new THREE.Vector3(lineLength, yScanHeight, 0)
  ];
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({
      color: 0x0000ff
    })
  );
  const linePositions = line.geometry.attributes.position;

  return { line, linePositions }
}

export function rotateRaycasterLine(line: THREE.Line, angle: number) {
  line.rotateY(angle);
  line.updateMatrixWorld(true);
  line.geometry.applyMatrix4(line.matrixWorld);
  line.rotation.set(0, 0, 0);
}

export function changeRaycasterLineYPosition(line: THREE.Line, y: number) {
  const positions = line.geometry.attributes.position.array;
  positions[1] = y;
  positions[4] = y;
  line.geometry.attributes.position.needsUpdate = true;
}

export function addRaycasterLineYPosition(line: THREE.Line) {
  changeRaycasterLineYPosition(line, line.geometry.attributes.position.array[1] + 1);
}

export function subtractRaycasterLineYPosition(line: THREE.Line) {
  changeRaycasterLineYPosition(line, line.geometry.attributes.position.array[1] - 1);
}