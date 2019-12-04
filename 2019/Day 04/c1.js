const u = 124075, d = 580769;
let count = 0;

for (let i = u; i <= d; i++) {
  const check1 = +`${i}`.split('').sort().join('') === i;
  const multiples = `${i}`.match(/(\d)\1+/g);
  const check2 = multiples && multiples.length;
  if (check1 && check2) count++;
}

console.log(count);