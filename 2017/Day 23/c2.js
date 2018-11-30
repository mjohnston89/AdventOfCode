const input = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(l => l.split(' '));
const registers = new Map(), alpha = 'abcdefgh';

for (let j = 0; j < alpha.length; j++) { registers.set(alpha[j], 0); }
registers.set('a', 1);
registers.set('b', 79 * 100 + 100000);
registers.set('c', registers.get('b') + 17000);

do {
  registers.set('f', 1);
  registers.set('d', 2);
  for (let d = registers.get('d'); d * d < registers.get('b'); ++d) {
    if (registers.get('b') % d === 0) {
      registers.set('f', 0);
      break;
    }
  }
  if (registers.get('f') === 0) registers.set('h', registers.get('h') + 1)
registers.set('g', registers.get('b') - registers.get('c'))
registers.set('b', registers.get('b') + 17)
} while (registers.get('g') !== 0)

console.log(registers.get('h'));