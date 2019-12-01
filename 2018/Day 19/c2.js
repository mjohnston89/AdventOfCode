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

let input = require('fs').readFileSync('input.txt').toString().trim().split('\n');
let ip, registers = [1, 0, 0, 0, 0, 0];

// Map each input line into an object containing operation and 3 args
// Except line 1 which defines the instruction pointer
[ip, ...input] = input.map((ins, i) => {
  if (i === 0) {
    return Number(ins.slice(-1));
  } else {
    const parts = ins.split(' ');
    let op = parts.shift();
    let args = parts.map(Number);
    return {op, args};
  }
});

// Loop through input lines until the pointer looks for a non defined instruction
while (registers[ip] < input.length - 1) {
  let {op, args} = input[registers[ip]];
  registers = opcodes[op](registers, ...args);
  registers[ip]++;
}

let sum = 0, base = Math.max(...registers);

for (let divisor = 1; divisor <= Math.sqrt(base); divisor++) {
  if (base % divisor === 0) {
    sum += divisor;
    sum += base / divisor;
  }
}

console.log(sum);