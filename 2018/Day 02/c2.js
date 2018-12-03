const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

const len = inputs[0].length;
let common = null;

for (let i = 0; i < inputs.length - 1; i++) {
  const last = [...inputs[i]];
  for (let j = i + 1; j < inputs.length; j++) {
    const match = [...inputs[j]].filter((char, idx) => char === last[idx]);
    if (len - match.length === 1) {
      common = match;
      break;
    }
  }
}

console.log(common.join(''));