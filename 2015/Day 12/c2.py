print('Advent of Code - Day 12, Challenge 2\n')

import json

def sumnum(object):
    # if object type is a dictionary and doesn't contain the string 'red'
    if type(object) == type(dict()):
        if "red" in object.values():
            return 0
        return sum(map(sumnum, object.values()))
    # if object type is a list
    if type(object) == type(list()):
        return sum(map(sumnum, object))
    # if object type is integer
    if type(object) == type(0):
        return object

    return 0

# load json data into 'data'
data = json.loads(open('input.txt', 'r').read())
# calculate and print results
print sumnum(data)