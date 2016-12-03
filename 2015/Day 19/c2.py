print('Advent of Code - Day 19, Challenge 2\n')

import re
from random import shuffle

replacements = []
source = ''
steps = 0

# Open source file and findall replacement expressions and store them in replacements
# Finally store the final line of the input as the source molecule
with open('input.txt') as file:
    lines = [line.strip() for line in file]
    for i in lines[:-2]:
        m = re.findall(r'(\S+) => (\S+)', i)
        replacements.append(m[0])
    source = lines[-1] 

while source != 'e':
    tmp = source
    for a, b in replacements:
        if b not in source:
            continue
        source = source.replace(b, a, 1)
        steps += 1
    if tmp == source:
        source = mol
        steps = 0
        shuffle(replacements)

print steps