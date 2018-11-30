const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const pipes = new Map();

input.forEach((line) => {
  const temp = line.split(' <-> ');
  pipes.set(parseInt(temp[0], 10), temp[1].split(',').map(Number));
})

let found = new Set([0]);
let foundAll = false;

while(!foundAll) {
  const tempLength = found.size;
  found.forEach((entry) => {
    pipes.get(entry).forEach(x => found.add(x));
  });
  if (found.size === tempLength) {
    foundAll = true;
  }
}

console.log(found.size);