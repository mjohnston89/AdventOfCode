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
console.log(alpha);

// Create 5 empty workers, an array to hold what has been worked on and a time counter
const workers = [...Array(5)].map(w => ({ curr: null, left: 0 }));
const working = [];
let time = 0;

// Remove dependencies in order until all instructions completed
let str = '';
while(true) {
  workers.forEach(w => {
    // if worker has work left to do
    if (w.left) {
      // reduce time by 1 and check if finished
      w.left--;
      if (!w.left) {
        // if now finished, remove dependency from all keys, and remove its own key
        delete alpha[w.curr];
        Object.keys(alpha).forEach(k => {
          alpha[k] = alpha[k].filter(i => i !== w.curr);
        })
        // Add this index to output
        str += w.curr;
        w.curr = null;
      }
    }
  })
  // Check if we have done all steps
  if (!Object.keys(alpha).length) break;
  // find index(es) with no dependency count that are not currently be worked on
  const indexes = [];
  Object.keys(alpha).forEach(k => {
    if (!alpha[k].length && !working.includes(k)) indexes.push(k);
  })
  // check if any workers are available and there is an available step
  if (workers.some(w => w.left === 0) && indexes.length) {
    workers.forEach(w => {
      // if worker is available
      if (!w.left) {
        if (indexes.length) {
          // if index left to assign, then assign
          w.curr = indexes.shift();
          // time to complete = character position in alphabet + 60
          // a: 1 + 60, b: 2 + 60 ...
          w.left = (parseInt(w.curr, 36) - 9) + 60;
          // add index to working array so it cannot be used by any other worker
          working.push(w.curr);
        }
      }
    })
  }
  time++;
}

console.log('\nTime: ', time, '\nOutput: ', str)