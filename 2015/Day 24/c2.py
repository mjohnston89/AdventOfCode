print('Advent of Code - Day 24, Challenge 2\n')

import itertools
import operator

# store each weight value from input file
weights = []
for line in open('input.txt'):
	weights.append(int(line.strip()))

# find balance between 3 parts of santas sleigh
parts = 4
total = sum(weights)/parts

# cycle through combinations of parcels to bring a balanced weight distribution
def hasSum(lst, sub):
    for y in range(1,len(lst)): 
        for x in (z for z in itertools.combinations(lst, y) if sum(z) == total):
            if sub == 2:
                return True
            elif sub < parts:
                return hasSum(list(set(lst) - set(x)), sub - 1)
            elif hasSum(list(set(lst) - set(x)), sub - 1):
                return reduce(operator.mul, x, 1)

print hasSum(weights, parts)