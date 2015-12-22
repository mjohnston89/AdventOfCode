print('Advent of Code - Day 21, Challenge 1\n')

import math
from collections import namedtuple
from itertools import combinations

# Shop inventory stored as named tuples
Item = namedtuple('item',['name','cost','damage','armour'])
weapons = [	Item('Dagger',8,4,0),
			Item('Shortsword',10,5,0),
			Item('Warhammer',25,6,0),
			Item('Longsword',40,7,0),
			Item('Greataxe',74,8,0)]
armour = [	Item('Leather',13,0,1),
			Item('Chainmail',31,0,2),
			Item('Splintmail',53,0,3),
			Item('Bandedmail',75,0,4),
			Item('Platemail',102,0,5)]
rings = [	Item('Damage +1',25,1,0),
			Item('Damage +2',50,2,0),
			Item('Damage +3',100,3,0),
			Item('Defense +1',20,0,1),
			Item('Defense +2',40,0,2),
			Item('Defense +3',80,0,3)]
# Add the possibility that no armour or rings are used
armour.append(Item('None',0,0,0))
rings.append(Item('None',0,0,0))
rings.append(Item('None',0,0,0))

# store the bosses attributes[hit points,damage,armour] from input file
boss = list()
for line in open('input.txt'):
	attribute = int(line.split()[-1].strip())
	boss.append(attribute)

# calculate players damage - minimum of 1 must be returned
def playerDamage(w,a,r):
	return max(1,(w.damage+r[0].damage+r[1].damage-boss[2]))

# calculate boss' damage - minimum of 1 must be returned
def bossDamage(w,a,r):
	return max(1,(boss[1]-a.armour-r[0].armour-r[1].armour))

# calculate the minimum cost to win the fight
minCost = min([w.cost+a.cost+r[0].cost+r[1].cost
				for w in weapons 
				for a in armour 
				for r in combinations(rings,2) 
				if (boss[0]//playerDamage(w,a,r)) <= (99//bossDamage(w,a,r))
			])

print minCost