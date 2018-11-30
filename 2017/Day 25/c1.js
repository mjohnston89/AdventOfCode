const tape = new Array(19999).fill(0);
let active = 10000, state = 'a';

for (let i = 0; i < 12172063; i++) {
  switch (state) {
    case 'a': tape[active] ? updateStates(0, 'l', 'c') : updateStates(1, 'r', 'b'); break;
    case 'b': tape[active] ? updateStates(1, 'l', 'd') : updateStates(1, 'l', 'a'); break;
    case 'c': tape[active] ? updateStates(0, 'r', 'c') : updateStates(1, 'r', 'd'); break;
    case 'd': tape[active] ? updateStates(0, 'r', 'e') : updateStates(0, 'l', 'b'); break;
    case 'e': tape[active] ? updateStates(1, 'l', 'f') : updateStates(1, 'r', 'c'); break;
    case 'f': tape[active] ? updateStates(1, 'r', 'a') : updateStates(1, 'l', 'e'); break;
  }
}

console.log(tape.reduce((a,b)=>a+b));

function updateStates(val, move, newState) {
  tape[active] = val;
  active = move === 'l' ? active - 1 : active + 1;
  state = newState;
}
