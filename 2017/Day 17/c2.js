const input = 356;
let position = 0, res = 0;

for(let i = 1; i < 50000001; i++) {
  position = (position + input) % i;
  position++;
  if (position===1) { res = i; }
}

console.log(res);