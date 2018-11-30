const input = require('fs').readFileSync('input.txt').toString().trim().split('\n');

class Prog {
  constructor(pid) {
    this.register = {p: pid}
    this.pid = pid
    this.pos = 0
    this.queue = []
    this.sent = 0
  }

  val (x) { return /\d+/.test(x) ? +x : this.register[x] }
  set (x,y) { this.register[x] = this.val(y) }
  add (x,y) { this.register[x] += this.val(y) }
  mul (x,y) { this.register[x] *= this.val(y) }
  mod (x,y) { this.register[x] %= this.val(y) }
  jgz (x,y) { if (this.val(x) > 0) this.pos += this.val(y) - 1 }

  snd (x) {
    p[1-this.pid].queue.push(this.val(x))
    this.sent++
  }

  rcv (x) {
    if (this.queue.length == 0) {
      this.pos-- // stay on same command
      this.waiting = true
    } else
      this.register[x] = this.queue.shift()
  }

  run () {
    this.waiting = false
    this[input[this.pos].substr(0,3)](...input[this.pos].substr(4).split(" "))
    this.pos++
  }
}

const p = [new Prog(0), new Prog(1)];

do {
  p.map(x => x.run())
} while (!(p[0].waiting && p[1].waiting))

console.log(p[1].sent);