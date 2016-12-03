print('Advent of Code - Day 14, Challenge 2\n')

reindeer = dict()

# Open source file
for line in open('input.txt'):
	# split each line
    (name,_,_,speed,_,_,fly,_,_,_,_,_,_,rest,_) = line.split()
    # create dictionary for each reindeer and add to master dictionary
    temp = {name:{'speed':int(speed),'fly':int(fly),'rest':int(rest),'distance':0,'points':0,'flyCount':0,'restCount':0,'status':'f'}}
    reindeer.update(temp)

distance = 0
for i in range(2503):
	for deer in reindeer:
		# if reindeer is flying
		if reindeer[deer]['status']=='f':
			# increase distance and time spent flying
			reindeer[deer]['distance']+= reindeer[deer]['speed']
			reindeer[deer]['flyCount']+=1
			# if time spent flying has reached limit, then change status and reset counter
			if reindeer[deer]['fly']==reindeer[deer]['flyCount']:
				reindeer[deer]['flyCount']=0
				reindeer[deer]['status']='r'
		# if reindeer is resting
		else:
			# increase time spent resting
			reindeer[deer]['restCount']+=1
			# if time spent resting has reached limit, then change status and reset counter
			if reindeer[deer]['restCount']==reindeer[deer]['rest']:
				reindeer[deer]['restCount']=0
				reindeer[deer]['status']='f'
		# if a new highest distance is reached by this reindeer, update 'distance'
		if reindeer[deer]['distance']>distance:
			distance=reindeer[deer]['distance']

	# if a reindeer has acheived the highest distance award a point 
	for deer in reindeer:
		if reindeer[deer]['distance']==distance:
			reindeer[deer]['points']+=1

# find reindeer with greatest number of points and output the number of points
points = 0
for deer in reindeer:
	if reindeer[deer]['points']>points:
		points=reindeer[deer]['points']
print points