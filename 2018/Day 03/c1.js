const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

const grid = {};

inputs.forEach(claim => {
  const parts = claim.split(' ');
  const id = parts[0].slice(1);
  const [cx, cy] = parts[2].slice(0, -1).split(',').map(Number);
  const [cw, ch] = parts[3].split('x').map(Number);
  for (let x = cx; x < cx + cw; x++) {
    for (let y = cy; y < cy + ch; y++) {
      grid[`${x},${y}`] = (grid[`${x},${y}`] || 0) + 1;
    }
  }
});

const overlaps = Object.values(grid).filter(v => v > 1).length;
console.log(overlaps);
