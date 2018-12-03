const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

let count2 = 0, count3 = 0;

const charCounter = str => [...str].reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});

const countCheck = (ob, count) => Object.entries(ob).some(x => x[1] === count);

inputs.forEach(id => {
  const counted = charCounter(id);
  // Check if contains a letter that appears exactly two times
  if (countCheck(counted, 2)) count2++;
  // Check if contains a leeter that appears exatly three times
  if (countCheck(counted, 3)) count3++;
});

console.log(count2*count3);