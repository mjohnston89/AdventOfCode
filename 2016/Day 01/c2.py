print('Advent of Code - Day 1, Challenge 2')

startX = 0
startY = 0
bearing = ['N','E','S','W']
facing = 0
visited = []
repeated = []

def updateFacing(facing, turn):
  if (turn=='L'):
    facing = (facing - 1) % 4
  else:
    facing = (facing + 1) % 4
  return facing

# Open source file
with open('input.txt') as file:
  for line in file:
    instructions = line.split(', ')
  for move in instructions:
    distance = int(move[1:])
    facing = updateFacing(facing,move[0])
    if (facing==0):
      startY += distance
    elif (facing==1):
      startX += distance
    elif (facing==2):
      startY -= distance
    elif (facing==3):
      startX -= distance
    if (len(visited)==0):
      if [startX,startY] in visited:
        repeated = [startX,startY]
      else:
        visited.append([startX,startY])

distance = abs(repeated[0]) + abs(repeated[1])
print('The final location is: ' + bearing[facing] + ' (' + str(startX) + ',' + str(startY) + ')')
print('The final distance is: ' + str(distance))