const serial = 2866, gridSize = 300, grid = {}, groupSize = 3;
let result = { p: 0, x: null, y: null, size: null };

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

for (let y = 1; y <= gridSize; y++) {
  for (let x = 1; x <= gridSize; x++) {
    const maxSize = Math.min(gridSize + 1 - x, gridSize + 1 - y);
    let power = 0;
    for (let s = 0; s < maxSize; s += 1) {
      for (let dx = 0; dx < s; dx += 1) {
        power += grid[`${x+dx},${y+s}`];
      }
      for (let dy = 0; dy < s; dy += 1) {
        power += grid[`${x+s},${y+dy}`];
      }
      power += grid[`${x+s},${y+s}`];
      if (power > result.p) {
        result = { p: power, x: x, y: y, size: s + 1 };
      }
    }
  }
}
console.log(result);
