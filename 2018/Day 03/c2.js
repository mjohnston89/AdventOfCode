const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

const grid = {}, claims = {};

inputs.forEach(claim => {
  const parts = claim.split(' ');
  const id = parts[0].slice(1);
  const [cx, cy] = parts[2].slice(0, -1).split(',').map(Number);
  const [cw, ch] = parts[3].split('x').map(Number);
  claims[id] = true;
  for (let x = cx; x < cx + cw; x++) {
    for (let y = cy; y < cy + ch; y++) {
      if (grid[`${x},${y}`]) {
        claims[grid[`${x},${y}`]] = false;
        claims[id] = false;
      }
      grid[`${x},${y}`] = id;
    }
  }
});

const alone = Object.entries(claims).filter(v => v[1])[0][0];
console.log(alone);