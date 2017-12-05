const input = require('fs').readFileSync('input.txt').toString().trim().split("\n").map(x => parseInt(x, 10));
let current = 0;
let steps = 0;
while (current > -1 && current < input.length) {
  steps++;
  const newPos = current + input[current];
  input[current]++;
  current = newPos;
}
console.log(steps);