file = open('input.txt', 'r')

instruction = []



for line in file:
    line = line.rstrip('\n')
    instruction.append(line)

for ans in range(10000000):
    regs = {'a' : ans, 'b': 0, 'c':1, 'd':0}

    count = 0
    output = []
    while count < len(instruction):
        i = instruction[count]
        split = i.split()
        cmd = split[0]
        #print(i)
        if cmd == 'cpy':
            if split[1] in regs:
                regs[split[2]] = regs[split[1]]

            else:
                regs[split[2]] = int(split[1])

        if cmd == 'inc':
            regs[split[1]] += 1

        if cmd == 'dec':
            regs[split[1]] -= 1

        if cmd == 'jnz':
            if split[1] in regs:
                if regs[split[1]] != 0:
                    count += int(split[2]) - 1
            else:
                if int(split[1]) != 0:
                   count += int(split[2]) - 1

        if cmd == 'out':
            #print(output,split)
            #print(regs['b'])
            if len(output) == 0 and regs[split[1]] == 0:
                output.append(regs[split[1]])
            elif len(output) == 0 and regs[split[1]] != 0:
                break
            elif output[-1] == 0 and regs[split[1]] == 1:
                output.append(regs[split[1]])
            elif (output[-1]) == 1 and regs[split[1]] == 0:
                output.append(regs[split[1]])
            else:
                break

        if len(output)>= 100:
            print(ans)
            break
        #print(regs['b'])
        count +=1
    if len(output)>= 100:
            break