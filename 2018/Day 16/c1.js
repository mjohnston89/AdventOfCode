// Our set of operations. Each take a register and return an altered register
const opcodes = {
  addr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] + reg[b];
    return out;
  },
  addi: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] + b;
    return out;
  },
  mulr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] * reg[b];
    return out;
  },
  muli: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] * b;
    return out;
  },
  banr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] & reg[b];
    return out;
  },
  bani: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] & b;
    return out;
  },
  borr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] | reg[b];
    return out;
  },
  bori: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] | b;
    return out;
  },
  setr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a];
    return out;
  },
  seti: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = a;
    return out;
  },
  gtir: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = a > reg[b] ? 1 : 0;
    return out;
  },
  gtri: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] > b ? 1 : 0;
    return out;
  },
  gtrr: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] > reg[b] ? 1 : 0;
    return out;
  },
  eqir: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = a == reg[b] ? 1 : 0;
    return out;
  },
  eqri: (reg, a, b, c) => {
    let out = reg.slice(0);
    out[c] = reg[a] == b ? 1 : 0;
    return out;
  },
  eqrr: (reg, a, b, c) => {
    reg[c] = reg[a] == reg[b] ? 1 : 0;
    return reg;
  },
}

// Takes in a step from the input and counts which of the opcode functions
// would produce a valid result. Increase counter if 3 or more
const getCodes = s => {
  let count = 0;
  Object.keys(opcodes).forEach(o => {
    const out = opcodes[o](s.before, s.ins[1], s.ins[2], s.ins[3]);
    if(out+'' === s.after+'') count += 1
  })
  if (count > 2) counter++;
}

// Define inital variables and get input
let counter = 0;
let input = require('fs').readFileSync('input.txt').toString().trim().split('\n\n\n');

// Map each group of input lines into an object containing a before register,
// an instruction and an after register. Run getCodes on each group to populate
// opcode counts.
input[0].split('\n\n').map(s => {
  const parts = s.split('\n');
  return {
    before: parts[0].slice(9, -1).split(', ').map(Number),
    ins: parts[1].split(' ').map(Number),
    after: parts[2].slice(9, -1).split(', ').map(Number)
  }
}).forEach(s => getCodes(s));

console.log(counter);