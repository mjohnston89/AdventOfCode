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

// Build grid from above constraints. Each grid location will be marked with its closest point.
// This will be an input index or a '.' to signify it is equally close to multiple points.
const grid = {};
for (let y = min.y; y < max.y; y++) {
  for (let x = min.x; x < max.x; x++) {
    for (let i = 0; i < coords.length; i++) {
      if (coords[i][0] === x && coords[i][1] === y) {
        grid[`${x},${y}`] = [i, 0, true];
      } else {
        const d = Math.abs(coords[i][0] - x) + Math.abs(coords[i][1] - y); 
        if(!grid[`${x},${y}`]) {
          grid[`${x},${y}`] = [i, d, true];
        } else if (d < grid[`${x},${y}`][1]) {
          grid[`${x},${y}`] = [i, d, true];
        } else if (grid[`${x},${y}`][1] === d) {
          grid[`${x},${y}`] = ['.', d, false];
        }
      }
    }
  }
}

// Find indexes of all input points whose area now lie on the edge of the grid
const atEdge = new Set();
Object.entries(grid).forEach(e => {
  const [x, y] = e[0].split(',').map(Number);
  if (x === min.x || x === max.x || y === min.y || y === max.y -1 ) {
    atEdge.add(grid[`${x},${y}`][0]);
  }
})

// Calculate a total area for each point whose area does not touch the edge at all
const countedPoints = {};
Object.entries(grid).forEach(e => {
  if (!atEdge.has(e[1][0])) {
    countedPoints[e[1][0]] = (countedPoints[e[1][0]] || 0) + 1;
  }
})

// Find the index with the highest area count
const highest = Object.keys(countedPoints).reduce((prev, curr) => {
  return countedPoints[prev] > countedPoints[curr] ? prev : curr;
});

console.log(countedPoints);
console.log(highest, countedPoints[highest]);