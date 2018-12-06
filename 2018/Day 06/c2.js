let inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

  
// Find max and min size of grid, and destructure coords
let max = { x: 0, y: 0 };
let min = { x: 1000, y: 1000 };
const coords = [];
inputs.forEach(c => {
  const parts = c.trim().split(', ').map(Number);
  coords.push(parts);
  const [x, y] = parts;
  if (x > max.x) max.x = x;
  if (x < min.x) min.x = x;
  if (y > max.y) max.y = y;
  if (y < min.y) min.y = y;
})

// Build grid from above constraints. Each grid location will be marked with a 1 or 0.
// 1 if total distance to all input points is < 10000. 0 otherwise.
const grid = {};
for (let y = min.y; y < max.y; y++) {
  for (let x = min.x; x < max.x; x++) {
    let sum = 0;
    for (let i = 0; i < coords.length; i++) {
      sum += Math.abs(coords[i][0] - x) + Math.abs(coords[i][1] - y); 
    }
    grid[`${x},${y}`] = sum < 10000 ? 1 : 0;
  }
}

// Count the total region size
let regionSize = 0;
Object.values(grid).forEach(x => regionSize += x);
console.log(regionSize);
