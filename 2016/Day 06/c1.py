print('Advent of Code - Day 6, Challenge 1')

from collections import Counter

columns = []
message = ''

# Open source file and parse each instruction
with open('input.txt') as file:
  for num, line in enumerate(file):
    for index, char in enumerate(line.strip()):
      # if this is first line then add new list for each column
      if(num==0): columns.append([]);
      # append char to relevant column list
      columns[index].append(char)

for lst in columns:
  # for each list add the most common letter to message
  message += Counter(lst).most_common()[0][0]

print('The correct message is: ' + message)