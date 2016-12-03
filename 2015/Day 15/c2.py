print('Advent of Code - Day 15, Challenge 2\n')

ingredients = list()

# Open source file
for line in open('input.txt'):
	# split each line, convert to ints and store in ingredients
	(_,_,capacity,_,durability,_,flavour,_,texture,_,calories) = line.split()
	temp = [int(capacity[0:-1]),int(durability[0:-1]),int(flavour[0:-1]),int(texture[0:-1]),int(calories)]
	ingredients.append(temp)

total = 0

# iterate through all possible values of each ingredient
for a in range(101):
	for b in range(0,100-a+1):
		for c in range(0,101-(a-b)+1):
			d = 100 - (a+b+c)
			# if calories != 500 skip the rest of this iteration
			calories = a*ingredients[0][4] + b*ingredients[1][4] + c*ingredients[2][4] + d*ingredients[3][4]
			if calories!=500:
				continue
			# calculate propery scores and store in list
			temp = list()
			for i in range(len(ingredients)):
				temp.append(a*ingredients[0][i] + b*ingredients[1][i] + c*ingredients[2][i] + d*ingredients[3][i])
			# calculate total score by multiplying each property score
			tempTotal = 1
			for t in temp:
				# if property score is negative, set as 0
				if t<0: t=0
				tempTotal *= t
			# if new high score, store new high score
			if tempTotal>total:
				total = tempTotal

print total