const input = 347991;
// Calculate sprial grid size
let gridSize = Math.ceil(Math.sqrt(input));
if (gridSize % 2 == 0) { gridSize += 1; }
// Calculate origin point
const origin = [Math.floor(gridSize / 2), Math.floor(gridSize / 2)];
// Calulcate corners of grid
const bottomRight = gridSize * gridSize;
const bottomLeft = bottomRight - gridSize - 1;
const topLeft = bottomRight - (2 * (gridSize - 1));
const topRight = bottomRight - (3 * (gridSize - 1));
// Calculate grid position of input
let location = [0,0]
if (input == bottomRight) {
  location = [gridSize - 1, gridSize - 1];
} else if (input<bottomRight && input>bottomLeft) {
  // Bottom side
  location = [gridSize - 1 - (bottomRight - input), gridSize - 1];
} else if (input == bottomLeft) {
  location = [0, gridSize - 1];
} else if (input<bottomLeft && input>topLeft) {
  // Left side
  location = [0, gridSize - 1 - (bottomLeft - input)];
} else if (input<topLeft && input>topRight) {
  // Top side
  location = [topLeft - input, 0];
} else if (input == topRight) {
  location = [gridSize - 1, 0];
} else if (input<topRight) {
  // Right side
  location = [gridSize - 1, topRight - input]
}
const steps = Math.abs(origin[0] - location[0]) + Math.abs(origin[1] - location[1]);
console.log(steps);