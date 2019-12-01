const total = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map((x) => Math.floor(+x / 3) - 2)
  .reduce((acc, x) => acc + x, 0);

console.log(total);