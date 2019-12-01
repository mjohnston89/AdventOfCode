class Map{
  constructor(){
    this.rows = {};
  }

  addNode(node){
    this.set(node.x, node.y, node);
  }

  getRow(y){
    return this.rows[y] || (this.rows[y] = {});
  }

  set(x, y, node){
    this.getRow(y)[x] = node;
  }

  get(x, y){
    return this.getRow(y)[x] || {x, y, dist:Number.POSITIVE_INFINITY};
  }
}

function add(dx, dy){
  const node = map.get(currentNode.x + dx, currentNode.y + dy);
  node.dist = Math.min(node.dist, currentNode.dist + 1);
  currentNode = node;
  map.addNode(node);
}

let currentNode = { x: 0, y: 0, dist: 0};
const stack = [currentNode], map = new Map();
const input = require('fs').readFileSync('input.txt').toString().trim().split('');

input.forEach(c => {
  switch(c){
    case "N": add(0, -1); break;
    case "S": add(0, 1); break;
    case "E": add(1, 0); break;
    case "W": add(-1, 0); break;
    case "(": stack.push(currentNode); break;
    case ")": currentNode = stack.pop(); break;
    case "|": currentNode = stack[stack.length - 1]; break;
    default:break;
  }
});

const dists = [];
for(let r in map.rows){
  for(let k in map.rows[r]){
    dists.push(map.rows[r][k].dist);
  }
}

console.log(dists.filter(d => d >= 1000).length);