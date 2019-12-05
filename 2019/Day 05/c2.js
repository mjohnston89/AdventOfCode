const l = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(",")
  .map(Number);

const parse = (input) => {
  const x = l.slice(0);
  let p = 0, out = 0;

  const getParam = (mode, pos) => mode === 0 ? x[x[pos]] : x[pos];

  while (x[p] !== 99) {
    const ins = `${x[p]}`.padStart(5, '0');
    const o = +ins.slice(3);
    const m1 = +ins[2];
    const m2 = +ins[1];
    switch (o) {
      case 1:
        x[x[p+3]] = getParam(m1, p+1) + getParam(m2, p+2);
        p += 4;
        break;
      case 2:
        x[x[p+3]] = getParam(m1, p+1) * getParam(m2, p+2);
        p += 4;
        break;
      case 3:
        x[x[p+1]] = input;
        p += 2;
        break;
      case 4:
        out = getParam(m1, p+1);
        p += 2;
        break;
      case 5:
        p = (getParam(m1, p+1) !== 0) ? getParam(m2, p+2) : p += 3
        break;
      case 6:
        p = (getParam(m1, p+1) === 0) ? getParam(m2, p+2) : p += 3
        break;
      case 7:
        x[x[p+3]] = (getParam(m1, p+1) < getParam(m2, p+2)) ? 1 : 0;
        p += 4;
        break;
      case 8:
        x[x[p+3]] = (getParam(m1, p+1) === getParam(m2, p+2)) ? 1 : 0;
        p += 4;
        break;
    }
  }
  return out;
};

console.log(parse(5));
