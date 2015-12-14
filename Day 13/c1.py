print('Advent of Code - Day 13, Challenge 1\n')

from itertools import permutations

names = list()
people = dict()

# Open source file
for line in open('input.txt'):
	# split each line
    (person,_,sign,amount,_,_,_,_,_,_,beside) = line.split()
    # convert amount to integer and make negative if necessary
    amount = int(amount)
    if(sign=='lose'): amount *= -1
    # if this is the first rule for a 'person'
    if person not in people:
    	# add person to list of names
    	names.append(person)
    	# create dictionary for person, add happiness data also on line
    	temp = {person:{beside[0:-1]:amount}}
    	# add new dictionary to people
    	people.update(temp)
    else:
    	# update person dictionary with this lines happiness data
    	temp = {beside[0:-1]:amount}
    	people[person].update(temp)

# initialise variables to hold results
happiness = 0
table = ''

# for each possible order
for variation in permutations(names):
	temp=0
	# recalculate level of happiness for each pair of people sitting next to each other
	for i in range(len(variation)):
		# the first two rules simulate the cycle, the third is the general rule
		if i==0:
			temp+=people[variation[i]][variation[i+1]]+people[variation[i]][variation[len(variation)-1]]
		elif i==len(variation)-1:
			temp+=people[variation[i]][variation[i-1]]+people[variation[i]][variation[0]]
		else:
			temp+=people[variation[i]][variation[i+1]]+people[variation[i]][variation[i-1]]
	# if calculated happiness is a new high, store value and order of guests
	if temp>happiness:
		happiness=temp
		table = variation

# print results
print happiness
print table