let a = 679, b = 771, total = 0;
const fA = 16807, fB = 48271, div = 2147483647;

const next = (val, fac) => val * fac % div;

for (let i = 0; i < 40000000; i++) {
  a = next(a, fA);
  b = next(b, fB);
  total += (a & 0xFFFF) == (b &0xFFFF)
}

console.log(total);