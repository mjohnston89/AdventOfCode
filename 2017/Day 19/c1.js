const input = require('fs').readFileSync('input.txt').toString().split('\n').map(l => l.split(''));
const paths = ['+', '-', '|'];
let x = 0, y = 0, direction = 'd', output = '';
// Find starting point
x = input[y].findIndex(item => item === '|');

const move = () =>  {
  switch (direction) {
    case 'd': y++; break;
    case 'u': y--; break;
    case 'r': x++; break;
    case 'l': x--; break;
  }
  if (input[y][x] === '+') {
    if (direction === 'd' || direction === 'u') {
      direction = input[y][x-1] !== ' ' ? 'l' : 'r';
    } else {
      direction = input[y-1][x] !== ' ' ? 'u' : 'd';
    }
  } else if (input[y][x].match(/[A-Z]/)) {
    output += input[y][x]
  }
};

const test1 = () => input[y][x] === ' ';
const test2 = () => x < 0 || y < 0;
const test3 = () => x > input[0].length - 1 || y > input[0].length - 1;

loop: while(1) {
  move();
  if (test1() || test2() || test3()) {
    break loop;
  }
}
console.log(output);