const calc = x => Math.floor(x / 3) - 2;
const sum = (acc, x) => acc + x;

const fuelTotal = (x) => {
  const fuel = calc(x);
  return (fuel > 0) ? fuel + fuelTotal(fuel) : 0;
}

const total = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map(fuelTotal)
  .reduce(sum);

console.log(total);
