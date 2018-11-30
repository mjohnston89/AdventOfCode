const input = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(l => l.split(' '));
const registers = new Map(), alpha = 'abcdefgh';
let counter = 0, i = 0;

for (let j = 0; j < alpha.length; j++) { registers.set(alpha[j], 0); }

loop: while (1) {
  if (!input[i]) { break loop; }
  switch (input[i][0]) {
    case 'set':
      registers.set(input[i][1], getVal(input[i][2]));
      break;
    case 'sub':
      registers.set(input[i][1], registers.get(input[i][1]) - getVal(input[i][2]));
      break;
    case 'mul':
      counter++;
      registers.set(input[i][1], registers.get(input[i][1]) * getVal(input[i][2]));
      break;
    case 'jnz':
      if(getVal(input[i][1]) !== 0) {
        i = i - 1 + getVal(input[i][2]);
      }
      break;
  }
  i++;
}

console.log(counter);

function getVal(input) {
  return isNaN(input) ? registers.get(input) : parseInt(input, 10);
}