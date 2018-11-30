// const input = require('fs').readFileSync('test.txt').toString().trim().split('\n').map(l => l.split(' => '));
let flip = (x) => x.split``.reverse().join``
let rotate = (ar) => ar.reduceRight((v,x) => (x.split``.map((y,n)=>v[n]+=y),v), Array(ar.length).fill(""))
let transforms = new Map()
let image = [".#.","..#","###"]
function store([input, output]) {
    let outputPattern = output.join``
    transforms.set(input.join``, outputPattern)
    for (let i = 0; i < 3; i++) {
        input = rotate(input)
        transforms.set(input.join``, outputPattern)
    }
    input = input.map(flip)
    transforms.set(input.join``, outputPattern)
    for (let i = 0; i < 3; i++) {
        input = rotate(input)
        transforms.set(input.join``, outputPattern)
    }
}
function advance(ar) {
    let size = 2 + ar.length % 2
    let chunks = Array(ar.length / size).fill().map(x => Array(ar.length / size).fill(""))
    ar.map((row,y) => row.split``.map((cell,x) => chunks[y/size|0][x/size|0] += cell))
    chunks = chunks.map(row => row.map(cell => transforms.get(cell)))
    size++
    let newImage = Array(chunks.length*size).fill("")
    chunks.map((row,y) => row.map(col => col.split``.map((ch,n) => newImage[y*size+(n/size|0)] += ch)))
    return newImage
}
require('fs').readFileSync('test.txt').toString().trim().split("\n").map(x=>x.split(" => ").map(y=>y.split("/"))).map(store)
for (let i = 0; i<5; i++) image = advance(image)
image.reduce((v,row) => v + row.split``.reduce((w,ch)=>w+(ch=="#"?1:0),0),0)
