print('Advent of Code - Day 25, Challenge 1\n')

# read content of input file and extract the bounds
content = open('input.txt').read()
bounds = [int(content.split()[-3][:-1]), int(content.split()[-1][:-1])]

# starting code provided in puzzle description
theCode = 20151125

# calculate code at [row,column] provided from bounds
theCount = sum(range(bounds[0] + bounds[1] - 1)) + bounds[1]
for i in range(theCount - 1):
    theCode = (theCode * 252533) % 33554393
print(theCode)