const input = require('fs').readFileSync('input.txt').toString().trim().split(",");
const dirs = {
  'n': [-1,1,0],
  'ne': [0,1,-1],
  'se': [1,0,-1],
  's': [1,-1,0],
  'sw': [0,-1,1],
  'nw': [-1,0,1]
};
let coords = [0,0,0];
let max = -Infinity;
const distance = (x => x.map(Math.abs).reduce((a,b) => Math.max(a,b)));

for (let d of input) {
  coords = coords.map( (x,i) => x + dirs[d][i] )
  max = Math.max(max, distance(coords))
}
console.log(distance(coords), max);