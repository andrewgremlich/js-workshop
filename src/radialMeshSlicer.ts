import { BufferGeometry } from "three";

/**
 * Converts a one-dimensional array of xyz coordinates into GCode instructions.
 * @param vertices - A one-dimensional array of xyz coordinates (output of sliceRadially).
 * @param feedRate - Feed rate for the GCode (e.g., speed of the tool movement).
 * @returns string - The generated GCode as a string.
 */
export function generateGCode(bufferGeometry: BufferGeometry, feedRate: number = 1000): string {
  const vertices = bufferGeometry.getAttribute("position").array;

  let gcode = `G21 ; Set units to millimeters\n`; // Initialize GCode with basic setup
  gcode += `G90 ; Set to absolute positioning\n`;
  gcode += `G1 F${feedRate} ; Set feed rate\n`;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i].toFixed(3);
    const y = vertices[i + 1].toFixed(3);
    const z = vertices[i + 2].toFixed(3);

    gcode += `G1 X${x} Y${y} Z${z}\n`; // Add movement command
  }

  gcode += `M30 ; Program end\n`; // End of GCode program
  return gcode;
}
