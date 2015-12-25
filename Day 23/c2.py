print('Advent of Code - Day 23, Challenge 2\n')

# read each line from input and store as list 'program'
program = []
for line in open('input.txt'):
    program.append(line.strip().replace(',', '').split())

programCounter = -1
# intialise both registers with a set to 1 and b to 0
register = {'a': 1, 'b': 0}
instructions = {}

# parse each instruction from input to find value in register b
while programCounter < len(program)-1:
    programCounter += 1
    instruction = program[programCounter]
    if instruction[0]=="hlf":
        register[instruction[1]] /= 2
    elif instruction[0]=="tpl":
        register[instruction[1]] *= 3
    elif instruction[0]=="inc":
        register[instruction[1]] += 1
    elif instruction[0]=="jmp":
        programCounter += int(instruction[1]) - 1
    elif instruction[0]=="jie":
        if register[instruction[1]] % 2==0: programCounter += int(instruction[2]) - 1
    elif instruction[0]=="jio":
        if register[instruction[1]]==1: programCounter += int(instruction[2]) - 1

print register['b']