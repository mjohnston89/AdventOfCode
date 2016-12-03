print('Advent of Code - Day 16, Challenge 1\n')

aunts = list()

# Open source file
for line in open('input.txt'):
	# split each line, convert and store available values
	# unavailable values remain as None. temp dictionary stored in list: 'aunts'
	(_,num,term1,value1,term2,value2,term3,value3) = line.split()
	temp = {'children':None,'cats':None,'samoyeds':None,'pomeranians':None,'akitas':None,'vizslas':None,'goldfish':None,'trees':None,'cars':None,'perfumes':None}
	temp[term1[0:-1]] = int(value1[0:-1])
	temp[term2[0:-1]] = int(value2[0:-1])
	temp[term3[0:-1]] = int(value3)
	aunts.append(temp)

# dictionary of aunt we are looking for
reference = {'children': 3,'cats': 7,'samoyeds': 2,'pomeranians': 3,'akitas': 0,'vizslas': 0,'goldfish': 5,'trees': 3,'cars': 2,'perfumes': 1}
# list to store the output
filtered = list()

# for each aunt check if all values match the reference values
# if they do we have found our aunt
for i, aunt in enumerate(aunts):
	check = True
	for k, v in aunt.items():
		if v!=None:
			if aunt[k]!=reference[k]:
				check = False
	if check==True:
		filtered.append(i+1)

print filtered[0]