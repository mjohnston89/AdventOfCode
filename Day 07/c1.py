print('Advent of Code - Day 7, Challenge 1')

# Open source file
with open('input.txt') as file:
	# store each line as commands
	commands = file.readlines()

# initialise dictionary to store commands and there instructions
cmds = dict()
# initialise dictionary to store parsed wires
wires = dict()

# split each line into dictionary with target as name, e.g. 'a': ['b', 'AND', 'c']
for command in commands:
    (ops, res) = command.split('->')
    cmds[res.strip()] = ops.strip().split(' ')

# get search target and recursively parse each wire name until values are found
def calculate(name):
	# if int value of target exists return it
    try:
        return int(name)
    except ValueError:
        pass

    # if name not in dictionary
    if name not in wires:
    	# get instructions associated with name
        instructions = cmds[name]
        # if there is only one instruction assign it recursively
        if len(instructions) == 1:
            output = calculate(instructions[0])
        else:
        	# get command type
            command = instructions[-2]
            # recursively parse relevant instruction
            if command == 'AND':
              output = calculate(instructions[0]) & calculate(instructions[2])
            elif command == 'OR':
              output = calculate(instructions[0]) | calculate(instructions[2])
            elif command == 'NOT':
              output = ~calculate(instructions[1])
            elif command == 'RSHIFT':
              output = calculate(instructions[0]) >> calculate(instructions[2])
            elif command == 'LSHIFT':
              output = calculate(instructions[0]) << calculate(instructions[2])
        # add output to dictionary of parsed wires
        wires[name] = output
    # return the targets value
    return wires[name]

# print output
print "a: %d" % calculate('a')