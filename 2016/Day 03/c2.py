print('Advent of Code - Day 3, Challenge 2')

from itertools import islice

def isValid(sides):
  return max(sides) < (sum(sides) - max(sides))

validCount = 0

# Open source file and parse each triangle
with open('input.txt') as file:
  while True:
    temps = [[],[],[]]
    # read 3 lines of input
    lineBlock = list(islice(file,3))
    if not lineBlock: break
    for i in range(3):
      # for each line process into 3 arrays of 3 ints
      lineBlock[i] = map(int,lineBlock[i].strip().split())
      for j in range(3):
        # reorganise into groups of 3 by index
        temps[j].append(lineBlock[i][j])
      if (len(temps[0])==3):
        for k in range(3):
          # when each contains 3 sides check if valid
          check = isValid(temps[k])
          if check: validCount += 1

print('Number of valid triangles is: ' + str(validCount))