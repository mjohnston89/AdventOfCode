const l = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(",")
  .map(Number);

const parse = (noun, verb) => {
  const x = l.slice(0);
  x[1] = noun;
  x[2] = verb;
  let p = 0;
  while (x[p] !== 99) {
    x[x[p+3]] = (x[p] === 1)
      ? x[x[p+1]] + x[x[p+2]]
      : x[x[p+1]] * x[x[p+2]];
    p += 4;
  }
  return x[0];
};

console.log(parse(12, 2));