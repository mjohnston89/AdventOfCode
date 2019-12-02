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

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    if (parse(noun, verb) === 19690720) {
      console.log((100 * noun) + verb);
      return;
    }
  }
}