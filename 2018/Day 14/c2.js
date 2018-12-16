let recipes = [3, 7], e1 = 0, e2 = 1;

while (recipes.length <= 30000000) {
  let sum = recipes[e1] + recipes[e2];
  for (let ch of sum.toString().split('')) {
    recipes.push(parseInt(ch, 10));
  }
  e1 += 1 + recipes[e1];
  e1 %= recipes.length;
  e2 += 1 + recipes[e2];
  e2 %= recipes.length;
}

let input = `110201`;
for (let i = 0; i < recipes.length - 6; ++i) {
  if (recipes[i] == input[0] && recipes[i+1] == input[1] && recipes[i+2] == input[2] && recipes[i+3] == input[3] && recipes[i+4] == input[4] && recipes[i+5] == input[5]) {
    console.log(i);
    break;
  }
}