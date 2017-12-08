const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");

const registers = new Map();
let greatest = 0;

input.forEach((line) => {
  const parts = line.split(' ');
  checkExist(parts[0]);
  checkExist(parts[4]);
  if (evalCondition(parts[4], parts[5], parts[6])) {
    let current = registers.get(parts[0]);
    current += parts[1]==='inc' ? Number(parts[2]) : Number(parts[2])*-1;
    greatest = current > greatest ? current : greatest;
    registers.set(parts[0], current);
  }
});

console.log(greatest);

function checkExist(register) {
  if (!registers.has(register)) {
    registers.set(register, 0);
  }
}

function evalCondition(register, operation, val) {
  let decision = false;
  switch (operation) {
    case '>':
      decision = registers.get(register) > Number(val) ? true : false;
      break;
    case '>=':
      decision = registers.get(register) >= Number(val) ? true : false;
      break;
    case '<':
      decision = registers.get(register) < Number(val) ? true : false;
      break;
    case '<=':
      decision = registers.get(register) <= Number(val) ? true : false;
      break;
    case '==':
      decision = registers.get(register) == Number(val) ? true : false;
      break;
    case '!=':
      decision = registers.get(register) != Number(val) ? true : false;
      break;
  }
  return decision;
}