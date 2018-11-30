let input = require('fs').readFileSync('input.txt').toString().trim().split('\n');
const reg = /p=<(.*?)>, v=<(.*?)>, a=<(.*?)>/;
input = input.map(a => {
  return a.match(reg).slice(1).map(b => {
    return b.split(',').map(Number);
  });
});

const update = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const distance = (particle) => particle.reduce((a,b) => Math.abs(a) + Math.abs(b));

const distances = [];
let seen = [];

for(var i = 0; i < 1000; i++) {
  input.forEach((particle, index) => {
    const position = particle[0];
    const velocity = particle[1];
    const acceleration = particle[2];
    particle[1] = update(velocity, acceleration);
    particle[0] = update(position, particle[1]);
    distances[index] = distance(particle[0]);   
    seen.push(`${particle[0][0]}/${particle[0][1]}/${particle[0][2]}`);
  });

  seen.forEach((val, index) => {
    const a = seen.indexOf(val);
    if(a != index){
      input[a] = null;
      input[index] = null;
    }
  });
  input = input.filter(c => c != null);
  seen = [];
};

console.log(input.length);