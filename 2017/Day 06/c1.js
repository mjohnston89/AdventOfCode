const input = require('fs').readFileSync('input.txt').toString().trim().split("\t").map(Number);
const stateArray = new Map();
let current = input.join();

while(!stateArray.has(current)) {
  stateArray.set(current, stateArray.size);
  let max = input.reduce((a,b) => Math.max(a,b));
  let index = input.indexOf(max);
  input[index] = 0;
  while(max > 0) {
    index = index++ === input.length-1 ? 0 : index++;
    input[index]++;
    max--;
  }
  current = input.join();
}

console.log(stateArray.size);