let input = 110201, recipes = [3, 7], e1 = 0, e2 = 1;

while (recipes.length <= input + 10) {
  let sum = recipes[e1] + recipes[e2];
  for (let ch of sum.toString().split('')) {
    recipes.push(parseInt(ch, 10));
  }
  e1 += 1 + recipes[e1];
  e1 %= recipes.length;
  e2 += 1 + recipes[e2];
  e2 %= recipes.length;
}

let s = '';
for (let i = input; i < input + 10; ++i) {
  s += recipes[i];
}
console.log(s);