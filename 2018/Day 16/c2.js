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

// Takes in a step from the input and checks which of the opcode functions
// would produce a valid result. If valid this opcode is stored in a set
const getCodes = s => {
  Object.keys(opcodes).forEach(o => {
    const out = opcodes[o](s.before, s.ins[1], s.ins[2], s.ins[3]);
    if(out+'' === s.after+'') {
      if(!sets.hasOwnProperty(s.ins[0])) sets[s.ins[0]] = new Set();
      sets[s.ins[0]].add(o);
    }
  })
}

// Define inital variables and get input
const sets = {}, num2Op = {};
let register = [0, 0, 0, 0];
let input = require('fs').readFileSync('input.txt').toString().trim().split('\n\n\n');

// Map each group of input lines into an object containing a before register,
// an instruction and an after register. Run getCodes on each group to populate
// opcode sets.
input[0].split('\n\n').map(s => {
  const parts = s.split('\n');
  return {
    before: parts[0].slice(9, -1).split(', ').map(Number),
    ins: parts[1].split(' ').map(Number),
    after: parts[2].slice(9, -1).split(', ').map(Number)
  }
}).forEach(s => getCodes(s));

// Repeatedly find sets with only one opcode, then set the index of that
// set to equal that opcode in num2Op. Stop when there are no more sets
// containing only one opcode
while(true) {
  const ready = Object.entries(sets).filter(s => s[1].size===1);
  if (ready.length) {
    ready.forEach(x => {
      const val = x[1].values().next().value;
      num2Op[x[0]] = val;
      Object.keys(sets).forEach(s => sets[s].delete(val))
    })
  } else {
    break;
  }
}

// Generate list of steps from second part of input file
const steps = input[1].trim().split('\n').map(s => s.split(' ').map(Number));
// For each step, starting with the initial register, apply the correct opcode
for (let s = 0; s < steps.length; s++) {
  register = opcodes[num2Op[steps[s][0]]](register, steps[s][1], steps[s][2], steps[s][3]);
}
console.log(register);