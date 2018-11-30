const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const pipes = new Map();

input.forEach((line) => {
  const temp = line.split(' <-> ');
  pipes.set(parseInt(temp[0], 10), temp[1].split(',').map(Number));
})

let inGroups = new Set();
let groups = [];

for (let i = 0; i < pipes.size; i++) {
  if (!inGroups.has(i)) {
    let found = new Set([i]);
    let foundAll = false;
    while(!foundAll) {
      const tempLength = found.size;
      found.forEach((entry) => {
        pipes.get(entry).forEach((x) => {
          inGroups.add(x);
          found.add(x);
        });
      });
      if (found.size === tempLength) {
        foundAll = true;
      }
    }
    groups.push(found)
  }
}

console.log(groups.length);