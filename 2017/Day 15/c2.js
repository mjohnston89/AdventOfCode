let a = 679, b = 771, total = 0;
const fA = 16807, fB = 48271, div = 2147483647;

const next = (val, fac, check) => {
  val = val * fac % div;
  return val % check ? next(val, fac, check) : val;
}

for (let i = 0; i < 5000000; i++) {
  a = next(a, fA, 4);
  b = next(b, fB, 8);
  total += (a & 0xFFFF) == (b &0xFFFF)
}

console.log(total);