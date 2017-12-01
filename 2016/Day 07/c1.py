# print('Advent of Code - Day 7, Challenge 1')

# import re

# num = 0

# # Open source file and parse each instruction
# with open('input.txt') as file:
#   for line in file:
#     line = re.sub(r'\[([^\]]+)\]', "", line.strip());
#     if re.search(r"(.)(?!\1)(.)\2\1", line):
#       num += 1

# print num

# # 135 - too high
# 

# import re

# input = open("input.txt", 'r')
# list = input.readlines()
# input.close()

# count = 0
# for line in list:
#     if re.search(r"(.)(?!\1)(.)\2\1", line):
#         if not re.search(r"\[[^]]*(.)(?!\1)(.)\2\1", line):
#             count += 1
# print(count)
# 115 :)

import re
with open('input.txt') as file:
    input = file.read().strip().splitlines()
file.close()

count = 0


def check_for_ABBA(s):
    resource = False
    resourcevals = []
    for i in range(0, len(s) - 2):
        if s[i] != s[i + 1] and s[i] == s[i + 2]:
            resource = True
            resourcevals.append(s[i:i+3])
    return resource, resourcevals


def is_bab(s, abbas):
    resource = False
    base = []
    for aba in abbas:
        base.append(aba[1] + aba[0] + aba[1])
    for i in range(0, len(s)-2):
        if s[i:i + 3] in base:
            resource = True
    return resource


for ip in input:
    valid = False
    ip_split = re.split('(\[[a-z]*\])', ip)
    abavals = []
    for grp in sorted(ip_split, reverse=True):
        if '[' not in list(grp):
            aba, temp_abba_vals = check_for_ABBA(grp)
            abavals.extend(temp_abba_vals)
        if '[' in list(grp):
            if is_bab(grp.replace('[', '').replace(']', ''), abavals):
                valid = True
    if valid:
        count += 1

print count

# 231 :)