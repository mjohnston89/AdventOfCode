print('Advent of Code - Day 19, Challenge 1\n')

import re

replacements = []
source = ''

# Open source file and findall replacement expressions and store them in replacements
# Finally store the final line of the input as the source molecule
with open('input.txt') as file:
	lines = [line.strip() for line in file]
	for i in lines[:-2]:
		m = re.findall(r'(\S+) => (\S+)', i)
		replacements.append(m[0])
	source = lines[-1] 

molecules = set()

# apply all possible replacemnets and add unique molecule results to 'molecules'
for i, j in replacements:
    for k in range(len(source)):
        if source[k:k+len(i)] == i:
            y = source[:k] + j + source[k+len(i):]
            molecules.add(y)

print len(molecules)