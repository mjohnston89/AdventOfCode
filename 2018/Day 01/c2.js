const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

let frequencies = new Set(), current = 0;

while (true) {
  for (let i = 0; i < inputs.length; i++) {
    current += Number(inputs[i]);
    if (frequencies.has(current)) {
      console.log(current);
      return current;
    }
    frequencies.add(current);
  }
}