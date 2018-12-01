const frequency = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .reduce((acc, x) => acc + Number(x), 0);

  console.log(frequency);