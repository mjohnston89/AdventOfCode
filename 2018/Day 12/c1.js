let inputs = require('fs').readFileSync('input.txt').toString().trim().split('\n')

// Add initial state to array
let state = inputs.splice(0,1)[0].split(': ')[1];
// Remove empty line
inputs = inputs.splice(1);
// Parse rules
const rules = inputs.map(r => {
  const parts = r.split(' => ');
  return { check: parts[0], out: parts[1] }
})

let index = 0;
for (let gen = 1; gen <= 20; gen++) {
  state = `....${state}....`;
  index +=4;
  let nxt = state.replace(/\#/g, '.')
  for (const r of rules) {
    for (let i = 0; i < state.length - 4; i++) {
      if (state.substr(i, 5) === r.check) {
        nxt = `${nxt.substring(0, i+2)}${r.out}${nxt.substring(i+3)}`
      }
    }
  }
  state = nxt
}

const total = Array.from(state.split('').entries()).reduce((sum, [i, pot]) => {
  const potNum = i - index
  if (pot === '#') sum += potNum
  return sum
}, 0);

console.log(total);