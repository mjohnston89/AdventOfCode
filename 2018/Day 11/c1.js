const serial = 2866, gridSize = 300, grid = {}, groupSize = 3;
let result = { p: 0, x: null, y: null };

const calculatePower = (x, y, s) => {
  const rackID = x + 10;
  let level = ((rackID * y) + s) * rackID;
  const str = '' + level;
  const digit = str.length > 2 ? str.slice(-3)[0] : 0;
  return Number(digit) - 5;
}

for (let y = 0; y < gridSize; y++) {
  for (let x = 0; x < gridSize; x++) {
    grid[`${x+1},${y+1}`] = calculatePower(x+1, y+1, serial);
  }
}

for (let y = 0; y < gridSize - groupSize + 1; y++) {
  for (let x = 0; x < gridSize - groupSize + 1; x++) {
    let power = 0;
    for (let dx = 1; dx < (groupSize + 1); dx++) {
      for (let dy = 1; dy < (groupSize + 1); dy++) {
        power += grid[`${x+dx},${y+dy}`];
      }
    }
    if (power > result.p) {
      result = { p: power, x: x + 1, y: y + 1 };
    }
  }
}
console.log(result);
