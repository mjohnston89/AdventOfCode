const input = require('fs').readFileSync('input.txt').toString().trim().split(",").map(Number);
const list = Array.from(Array(256).keys());
let current = 0;
let skipSize = 0;

for (let i = 0; i < input.length; i++) {
  if ((current + input[i]) > list.length) {
    const overflow = (current + input[i]) % list.length;
    const end = list.slice(current);
    const start = list.slice(0, overflow);
    let temp = [...end, ...start].reverse();
    const newEnd = temp.splice(0, end.length);
    // console.log('(1)', current, input[i], overflow, end, start, newEnd, temp);
    Array.prototype.splice.apply(list, [current, newEnd.length].concat(newEnd));
    Array.prototype.splice.apply(list, [0, temp.length].concat(temp));
  } else {
    const selection = list.slice(current, current + input[i]).reverse();
    // console.log('(2)', current, input[i], selection);
    Array.prototype.splice.apply(list, [current, input[i]].concat(selection));
  }
  current = (current + input[i] + skipSize) % list.length;
  skipSize++;
}

console.log(list[0] * list[1]);