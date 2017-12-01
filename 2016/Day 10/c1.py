print('Advent of Code - Day 10, Challenge 1')

assigns = []
gives = []
bots = [{} for i in range(1000)]

# Open source file and parse each instruction
with open('input.txt') as file:
  for line in file:
    parts = line.strip().split(' ')
    if (parts[0]=='value'):
      assigns.append([int(parts[1]), int(parts[-1])])
    else:
      gives.append([int(parts[1]), int(parts[6]), int(parts[-1])])
  for op in assigns:
    if('high' in bots[op[1]]): h = bots[op[1]]['high']
    else: h = 0
    if('low' in bots[op[1]]): l = bots[op[1]]['low']
    else: l = 0
    if (h+l)==0: bots[op[1]]['high'] = op[0]
    elif (h<op[0]):
      bots[op[1]]['high'], bots[op[1]]['low'] = op[0], h
    elif (h>op[0] and l<op[0]):
      bots[op[1]]['high'], bots[op[1]]['low'] = h, op[0]
  for index,move in enumerate(gives):
    if('high' in bots[move[0]] and 'low' in bots[move[0]]):
      print(move)
      # del gives[index]

# print assigns
# print gives

import re, collections


bot = collections.defaultdict(list)
output = collections.defaultdict(list)


with open('input.txt') as fp:
    instructions = fp.read().splitlines()


pipeline = {}
for line in instructions:
    if line.startswith('value'):
        n, b = map(int,re.findall(r'-?\d+', line))
        bot[b].append(n)
    if line.startswith('bot'):
        who, n1, n2 = map(int,re.findall(r'-?\d+', line))
        t1, t2 = re.findall(r' (bot|output)', line)
        pipeline[who] = (t1,n1),(t2,n2)


while bot:
    for k,v in dict(bot).items():
        if len(v) == 2:
            v1, v2 = sorted(bot.pop(k))
            if v1==17 and v2==61: print(k)
            (t1,n1),(t2,n2) = pipeline[k]
            eval(t1)[n1].append(v1)
            eval(t2)[n2].append(v2)


a,b,c = (output[k][0] for k in [0,1,2])
print(a*b*c)