function buildUnit(unit) {
  return {
    n: Number(unit[0]),
    hp: Number(unit[1]),
    immunities: ((unit[2] ? unit[2] : '') + (unit[4] ? unit[4] : "")).split(', ').filter(x => x),
    weaknesses: (unit[3] ? unit[3] : '').split(', ').filter(x => x),
    atk: Number(unit[5]),
    kind: unit[6],
    init: Number(unit[7]),
    side: -1,
    target: null,
    targeted: false,
    eff: function () { return this.n * this.atk },
    damageTo: function (other) { 
      if (other.immunities.includes(this.kind)) return 0;
      let mult = other.weaknesses.includes(this.kind) ? 2 : 1;
      return this.n * this.atk * mult;
    },
    attack: function () {
      this.target.n -= Math.floor(this.damageTo(this.target) / this.target.hp);
      this.target.targeted = false;
      this.target = null;
    }
  };
}

function parse(data, boost) {
  const regex = /(\d+) units each with (\d+) hit points (?:\((?:immune to ([\w, ]+))?;? ?(?:weak to ([\w, ]+))?;? ?(?:immune to ([\w, ]+))?\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)/;
  let [imm, inf] = data
    .map(armies => armies.split('\n').filter(l => /\d/.test(l)))
    .map(group => group.map(g => regex.exec(g).slice(1, 9)))
    .map(units => units.map(buildUnit));
  return [imm.map(x => ({...x, atk: x.atk + boost, side: 1})), inf.map(x => ({...x, side: 2}))].flat();
}

function targetSelect(groups) {
  groups.sort((a, b) => (a.eff() === b.eff()) ? b.init - a.init : b.eff() - a.eff());
  for (g of groups) {
    let target = groups
    .filter(x => !x.targeted && g.side != x.side)
    .reduce((acc, n) => {
      if (acc == null) return n;
      let da = g.damageTo(acc);
      let dn = g.damageTo(n);
      if (da < dn) return n;
      else if (da > dn) return acc;
      let ea = acc.eff();
      let en = n.eff();
      if (ea < en) return n;
      if (ea > en) return acc;
      if (acc.init < n.init) return n;
      else return acc;
    }, null);
    if (target === null || g.damageTo(target) == 0 || target.targeted || g.side == target.side) continue;
    target.targeted = true;
    g.target = target;
  }
  return groups;
}

function attack(groups) {
  groups.sort((a, b) => b.init - a.init);
  for (g of groups) {
    if (g.n < 1 || g.target === null) continue;
    g.attack();
  }
  return groups.filter(g => g.n > 0);
}

const input = require('fs').readFileSync('input.txt').toString().split('\n\n');
let groups = parse(input, 0);
let rounds = 0;
while (!(groups.every(g => g.side === 1) || groups.every(g => g.side === 2))) {
  groups = attack(targetSelect(groups));
  if (rounds > 2000) return ['Tie', -1];
  rounds++;
}
const result = [groups[0].side === 1 ? 'Immune System' : 'Infection', groups.reduce((a, g) => a + g.n, 0)]
console.log(result);