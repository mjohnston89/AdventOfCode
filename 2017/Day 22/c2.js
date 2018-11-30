const input = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(l => l.split(''));
const gridSize = 999, grid = Array(gridSize).fill().map(() => Array(gridSize).fill('.'));
let x = Math.floor(gridSize / 2), y = Math.floor(gridSize / 2), bursts = 10000000, facing = 0, infected = 0;

function updateNode(state) {
  let index = facing;
  switch (state) {
    case 'W': state = '#'; infected++; break;
    case '.': state = 'W'; index = facing - 1; break;
    case '#': state = 'F'; index = facing + 1; break;
    case 'F': state = '.'; index = facing + 2; break;
  }
  facing = (index + 4) % 4;
  return state;
}

function moveForward() {
  switch (facing) {
    case 0: y--; break;
    case 1: x++; break;
    case 2: y++; break;
    case 3: x--; break;
  }
}

input.forEach((line, index) => {
  const padding = (gridSize - input[0].length) / 2;
  const newLine = Array(padding).fill('.').concat(line).concat(Array(padding).fill('.'));
  const pos = (gridSize - input.length) / 2 + index;
  grid[pos] = newLine;
});

while (bursts--) {
  grid[y][x] = updateNode(grid[y][x])
  moveForward();
}
console.log(`(${x}, ${y})`, facing, infected);