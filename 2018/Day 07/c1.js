let inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

// Build array of objects with key being step and value being any dependencies for that step
const alpha = {}
inputs.forEach(step => {
  const [, dep, , , , , , target, , ] = step.split(' ');
  alpha[target] = (target in alpha) ? [...alpha[target], dep] : [dep];
  if (!(dep in alpha)) alpha[dep] = [];
});

// Remove dependencies in order until all instructions completed
let str = '';
while(true) {
  // loop through all keys in alpha and find index(es) with no dependency count
  const indexes = [];
  Object.keys(alpha).forEach(k => {
    if (!alpha[k].length) indexes.push(k);
  })
  // if no deps found then break
  if (!indexes.length) break;
  // if multiple indexes found then use the first alphabetically
  const idx = indexes.sort()[0];
  // remove that dependency from all keys, and remove its own key
  delete alpha[idx];
  Object.keys(alpha).forEach(k => {
    alpha[k] = alpha[k].filter(i => i !== idx);
  })
  // add this index to completion order string
  str += idx;
}

console.log(str)