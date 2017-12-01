const input = require('fs').readFileSync('input.txt').toString().trim();

let valid = [];
let i = 0;

while (i < input.length) {
  if (i === input.length-1) {
    if (input[i] === input[0]) { valid.push(parseInt(input[i], 10)) }
  } else {
    if (input[i] === input[i+1]) { valid.push(parseInt(input[i], 10)) }
  }
  i++;
}

const result = valid.reduce((a,b) => a + b, 0);

console.log(result);