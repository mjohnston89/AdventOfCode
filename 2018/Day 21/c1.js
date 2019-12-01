// // Our set of operations. Each take a register and return an altered register
// const opcodes = {
//   addr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] + reg[b];
//     return out;
//   },
//   addi: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] + b;
//     return out;
//   },
//   mulr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] * reg[b];
//     return out;
//   },
//   muli: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] * b;
//     return out;
//   },
//   banr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] & reg[b];
//     return out;
//   },
//   bani: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] & b;
//     return out;
//   },
//   borr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] | reg[b];
//     return out;
//   },
//   bori: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] | b;
//     return out;
//   },
//   setr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a];
//     return out;
//   },
//   seti: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = a;
//     return out;
//   },
//   gtir: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = a > reg[b] ? 1 : 0;
//     return out;
//   },
//   gtri: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] > b ? 1 : 0;
//     return out;
//   },
//   gtrr: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] > reg[b] ? 1 : 0;
//     return out;
//   },
//   eqir: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = a == reg[b] ? 1 : 0;
//     return out;
//   },
//   eqri: (reg, a, b, c) => {
//     let out = reg.slice(0);
//     out[c] = reg[a] == b ? 1 : 0;
//     return out;
//   },
//   eqrr: (reg, a, b, c) => {
//     reg[c] = reg[a] == reg[b] ? 1 : 0;
//     return reg;
//   },
// }

// let input = require('fs').readFileSync('input.txt').toString().trim().split('\n');
// let ip, registers = [-1, 0, 0, 0, 0, 0];

// // Map each input line into an object containing operation and 3 args
// // Except line 1 which defines the instruction pointer
// [ip, ...input] = input.map((ins, i) => {
//   if (i === 0) {
//     return Number(ins.slice(-1));
//   } else {
//     const parts = ins.split(' ');
//     let op = parts.shift();
//     let args = parts.map(Number);
//     return {op, args};
//   }
// });

// // Loop through input lines until the pointer looks for a non defined instruction
// while (registers[ip] < input.length) {
//   let {op, args} = input[registers[ip]];
//   opcodes[op](registers, ...args);
//   registers[ip]++;
//   if (op === "eqrr") {
//     console.log(registers[args[0]]);
//   }
// }

let input = require('fs').readFileSync('input.txt').toString().trim();
let ip;
[ip, ...input] = input.split("\n").map((instruction, i) => {
  if (i === 0) {
    return Number(instruction.match(/^#ip (\d+)$/)[1]);
  } else {
    let [, op, a, b, c] = instruction.match(/^(\w+) (\d+) (\d+) (\d+)$/);
    let args = [a, b, c].map(Number);
    return {op, args};
  }
});

let ops = {
  addr: (reg, a, b, c) => reg[c] = reg[a] + reg[b],
  addi: (reg, a, b, c) => reg[c] = reg[a] + b,

  mulr: (reg, a, b, c) => reg[c] = reg[a] * reg[b],
  muli: (reg, a, b, c) => reg[c] = reg[a] * b,

  banr: (reg, a, b, c) => reg[c] = reg[a] & reg[b],
  bani: (reg, a, b, c) => reg[c] = reg[a] & b,

  borr: (reg, a, b, c) => reg[c] = reg[a] | reg[b],
  bori: (reg, a, b, c) => reg[c] = reg[a] | b,

  setr: (reg, a, b, c) => reg[c] = reg[a],
  seti: (reg, a, b, c) => reg[c] = a,
  
  gtir: (reg, a, b, c) => reg[c] = a > reg[b] ? 1 : 0,
  gtri: (reg, a, b, c) => reg[c] = reg[a] > b ? 1 : 0,
  gtrr: (reg, a, b, c) => reg[c] = reg[a] > reg[b] ? 1 : 0,

  eqir: (reg, a, b, c) => reg[c] = a == reg[b] ? 1 : 0,
  eqri: (reg, a, b, c) => reg[c] = reg[a] == b ? 1 : 0,
  eqrr: (reg, a, b, c) => reg[c] = reg[a] == reg[b] ? 1 : 0,
};

let reg = [-1, 0, 0, 0, 0, 0];

while (reg[ip] < input.length) {
  let {op, args} = input[reg[ip]];
  ops[op](reg, ...args);
  reg[ip]++;

  if (op === "eqrr") {
    console.log(reg[args[0]]);
    break;
  }
}