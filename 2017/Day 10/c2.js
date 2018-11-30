let input = require('fs').readFileSync('input.txt').toString().trim().split('').map(x => x.charCodeAt(0));
const salt = [17, 31, 73, 47, 23]
input.push(...salt);
const list = Array.from(Array(256).keys());
let current = 0;
let skipSize = 0;
let loop = 64;
while(loop--) {
  for (let i = 0; i < input.length; i++) {
    if ((current + input[i]) > list.length) {
      const overflow = (current + input[i]) % list.length;
      const end = list.slice(current);
      const start = list.slice(0, overflow);
      let temp = [...end, ...start].reverse();
      const newEnd = temp.splice(0, end.length);
      Array.prototype.splice.apply(list, [current, newEnd.length].concat(newEnd));
      Array.prototype.splice.apply(list, [0, temp.length].concat(temp));
    } else {
      const selection = list.slice(current, current + input[i]).reverse();
      Array.prototype.splice.apply(list, [current, input[i]].concat(selection));
    }
    current = (current + input[i] + skipSize) % list.length;
    skipSize++;
  }
}

let hash = [];
while (list.length) { hash.push(list.splice(0, 16)) };
hash = hash.map((h) => {
  const hex = h.reduce((a,b) => a ^ b).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}).join('');

console.log(hash);