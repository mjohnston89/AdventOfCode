let inputs = require('fs').readFileSync('input.txt').toString().trim().split('\n')
// Add initial state to array
const pots = new Map(inputs.splice(0,1)[0].split(': ')[1].split('').entries());
// Remove empty line
inputs = inputs.splice(1);
// Parse rules
const rules = new Map(inputs.map(r => r.split(' => ')));


function iterate() {
  const readCopy = new Map(pots);
  const ids = Array.from(pots.keys());
  const leftmostPot = ids.reduce((prev, id) => Math.min(prev, id)) - 2;
  const rightmostPot = ids.reduce((prev, id) => Math.max(prev, id)) + 2;
  for (let potId = leftmostPot; potId <= rightmostPot; potId++) {
    const vicinity = [-2, -1, 0, +1, +2].map(offset => readCopy.has(potId + offset) ? readCopy.get(potId + offset) : ".").join("");
    if (rules.has(vicinity) && rules.get(vicinity) === "#") {
      pots.set(potId, "#");
    } else {
      pots.delete(potId);
    }
  }
}

let lastSum = null;
let lastDiff = null;
for (let generation = 1; generation <= 1000; generation++) {
  iterate();
  const sum = Array.from(pots.keys()).reduce((sum, key) => sum + key, 0);
  const diff = sum - lastSum;
  if (lastDiff === diff) {
    const result = sum + diff * (50000000000 - generation);
    console.log(`Diff: ${diff}, after ${generation - 1} generations`);
    console.log(`After 50000000000 genrations, the sum is ${result}`);
    break;
  }
  lastSum = sum;
  lastDiff = diff;
}
