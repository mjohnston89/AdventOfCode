print('Advent of Code - Day 16, Challenge 2\n')

aunts = list()

# Open source file
for line in open('input.txt'):
	# split each line, convert and store available values
	# unavailable values remain as None. temp dictionary stored in list: 'aunts'
	(_,num,term1,value1,term2,value2,term3,value3) = line.split()
	temp = {'children':None,'cats':None,'samoyeds':None,'pomeranians':None,'akitas':None,'vizslas':None,'goldfish':None,'trees':None,'cars':None,'perfumes':None}
	term1 = term1[0:-1]
	term2 = term2[0:-1]
	term3 = term3[0:-1]
	temp[term1] = int(value1[0:-1])
	temp[term2] = int(value2[0:-1])
	temp[term3] = int(value3)
	aunts.append(temp)

# dictionary of aunt we are looking for
reference = {'children': 3,'cats': 7,'samoyeds': 2,'pomeranians': 3,'akitas': 0,'vizslas': 0,'goldfish': 5,'trees': 3,'cars': 2,'perfumes': 1}
# list to store the output
filtered = list()

# for each aunt check if all values match required criteria
# if they do we have found our aunt
for i, aunt in enumerate(aunts):
	check = True
	for k, v in aunt.items():
		if v!=None:
			# check for cats and trees keys
			if k=='cats' or k=='trees':
				if aunt[k]<=reference[k]:
					check = False
			# check for pomeranians and goldfish keys
			elif k=='pomeranians' or k=='goldfish':
				if aunt[k]>=reference[k]:
					check = False
			# check for all other keys
			else:
				if aunt[k]!=reference[k]:
					check = False
	if check==True:
		filtered.append(i+1)

print filtered[0]