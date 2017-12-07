const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const inputs = [];
const children = [];
const unique = [];
input.forEach((line) => {
  if (line.split('->').length === 2) {
    line.split('->')[1].trim().split(', ').forEach(str => children.push(str));
  }
  inputs.push(line.split('(')[0].trim());
});
for(let i = 0; i < inputs.length; i++) {
  if (!children.includes(inputs[i])) {
    unique.push(inputs[i]);
  }
}
console.log(unique);