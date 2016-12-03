print('Advent of Code - Day 17, Challenge 1\n')

from itertools import combinations

containers = list()

# Open source file and read each line into list as integer
for line in open('input.txt'):
	containers.append(int(line))

combos = 0
smallest = 0
variations = 0

# for each combination of containers check if temp total is 150. If it is increase combos
# also store smallest length of viable combo and how many variants it has
for i in range(len(containers)-1):
	temp = 0
	for combo in combinations(containers,i):
		if sum(combo)==150:
			temp+=1
	if combos==0 and temp>0:
		smallest = i
		variations = temp
	combos+=temp

print combos, smallest, variations
