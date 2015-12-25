print('Advent of Code - Day 22, Challenge 2\n')

from collections import namedtuple
from copy import deepcopy
from sys import maxsize

# store the bosses attributes[hit points,damage] from input file
boss = list()
for line in open('input.txt'):
    attribute = int(line.split()[-1].strip())
    boss.append(attribute)

# Spell inventory stored as named tuples
Spell = namedtuple('spell',['name','cost','damage','armour','heal','mana','turns','index'])
spells = [  Spell('missile',53,4,0,0,0,0,0),
            Spell('drain',73,2,0,2,0,0,1),
            Spell('shield',113,0,7,0,0,6,2),
            Spell('poison',173,3,0,0,0,6,3),
            Spell('recharge',229,0,0,0,101,5,4)]

leastManaUsed = maxsize

def sim(myHP, bossHP, playerTurn, activespells, myMana, manaUsed):
    # initialise contstants
    bossDmg = 10
    myArmour = 0

    # at the start of each player turn decrement hp by 1 and check survival
    if playerTurn:
        myHP -= 1
        if myHP <= 0:
            return False

    # check each spell in activespells
    _activespells = []
    for spell in activespells:
        # if turns remain apply effect
        if spell.turns >= 0:
            bossHP -= spell.damage
            myHP += spell.heal
            myArmour += spell.armour
            myMana += spell.mana

        # if turns still remain after decrementing, add spell to new version of activespells
        if (spell.turns-1) > 0:
            _spell = Spell(spell.name,spell.cost,spell.damage,spell.armour,spell.heal,spell.mana,spell.turns-1,spell.index)
            _activespells.append(_spell)

    # check if boss has been defeated and if applicable store least mana amount
    if bossHP <= 0:
        print 'Boss defeated...'
        global leastManaUsed
        if manaUsed < leastManaUsed:
            leastManaUsed = manaUsed
        return True

    # if mana used is higher than the least discard this simulation
    if manaUsed >= leastManaUsed:
        return False

    # if it is the players turn
    if (playerTurn):
        # for each spell check if already active. if it is it cannot be chosen
        for i in range(len(spells)):
            spell = spells[i]
            spellAlreadyActive = False
            for j in range(len(_activespells)):
                if _activespells[j].index == spell.index:
                    spellAlreadyActive = True
                    break
            # if not already active create copy of active spells and append newly chosen spell and continue simulation
            if spell.cost <= myMana and not spellAlreadyActive:
                a = deepcopy(_activespells)
                a.append(spell)
                sim(myHP, bossHP, False, a, myMana-spell.cost, manaUsed+spell.cost)
    # if it is the boss' turn
    else:
        # decrement player hp and if player has hp remaining continue simulation
        myHP += myArmour-bossDmg if myArmour-bossDmg < 0 else -1
        if myHP > 0:
            sim(myHP, bossHP, True, _activespells, myMana, manaUsed)

# run simulation
sim(50,boss[0],True,[],500,0)
print leastManaUsed