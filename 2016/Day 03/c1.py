print('Advent of Code - Day 3, Challenge 1')

def isValid(sides):
  return max(sides) < (sum(sides) - max(sides))

validCount = 0

# Open source file and parse each triangle
with open('input.txt') as file:
  for line in file:
    check = isValid(map(int,line.strip().split()))
    if (check): validCount += 1

print('Number of valid triangles is: ' + validCount)