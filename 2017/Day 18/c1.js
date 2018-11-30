const input = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(l => l.split(' '));
const registers = new Map(), alpha = 'abcdefghijklmnopqrstuvwxyz';
let lastPlayed = 0, found = 0, i = 0;

for (let i = 0; i < alpha.length; i++) { registers.set(alpha[i], 0); }

loop: while (1) {
  switch (input[i][0]) {
    case 'snd':
      lastPlayed = parseInt(getVal(input[i][1]), 10);
      break;
    case 'set':
      registers.set(input[i][1], getVal(input[i][2]));
      break;
    case 'add':
      registers.set(input[i][1], registers.get(input[i][1]) + getVal(input[i][2]));
      break;
    case 'mul':
      registers.set(input[i][1], registers.get(input[i][1]) * getVal(input[i][2]));
      break;
    case 'mod':
      registers.set(input[i][1], registers.get(input[i][1]) % getVal(input[i][2]));
      break;
    case 'rcv':
      if(getVal(input[i][1]) !== 0) {
        found = lastPlayed;
        break loop;
      }
      break;
    case 'jgz':
      if(getVal(input[i][1]) !== 0) {
        i = i - 1 + getVal(input[i][2]);
      }
      break;
  }
  i++;
}

console.log(found);

function getVal(input) {
  return isNaN(input) ? registers.get(input) : parseInt(input, 10);
}