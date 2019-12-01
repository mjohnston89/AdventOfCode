const calc = x => Math.floor(x / 3) - 2;
const sum = (acc, x) => acc + x;

const total = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map(calcFuel)
  .reduce(sum);

console.log(total);