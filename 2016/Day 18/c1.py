# def main():
#     rows = 400000

#     data = []
#     with open('input.txt') as f:
#         data = list(f.read().strip())

#     def build_row(prev):
#         row = []
#         size = len(prev)

#         for n in range(size):
#             left = prev[n - 1] if n > 0 else '.'
#             center = prev[n]
#             right = prev[n + 1] if n < (size - 1) else '.'

#             is_trap = False
#             if left == '^' and center == '^' and right == '.':
#                 is_trap = True
#             elif center == '^' and right == '^' and left == '.':
#                 is_trap = True
#             elif left == '.' and center == '.' and right == '^':
#                 is_trap = True
#             elif left == '^' and center == '.' and right == '.':
#                 is_trap = True

#             row.append('^' if is_trap else '.')

#         return row

#     board = data[:]
#     count = board.count('.')

#     for n in range(rows - 1):
#         board  = build_row(board)
#         count += board.count('.')

#     print('Result({})'.format(count))

# if __name__ == '__main__':
#     main()

# currentRow = [x == '^' for x in open('input.txt', 'r').readline()]
# traps = ((True, True, False), (False, True, True), (True, False, False), (False, False, True))

# safeTiles = currentRow.count(False)
# for _ in range(399999):
#     nextRow = []
#     for i in range(len(currentRow)):
#         l, c, r = i > 0 and currentRow[i - 1], currentRow[i], i < len(currentRow) - 1 and currentRow[i + 1]
#         nextRow.append((l, c, r) in traps)
#     safeTiles += nextRow.count(False)
#     currentRow = nextRow

# print(safeTiles)
# input()

row = [tile == '^' for tile in '.^^^.^.^^^.^.......^^.^^^^.^^^^..^^^^^.^.^^^..^^.^.^^..^.^..^^...^.^^.^^^...^^.^.^^^..^^^^.....^....']
total = row.count(False)

for _ in range(40 - 1):
    next_row = []

    for i in range(len(row)):
        is_trap = (i > 0 and row[i - 1]) ^ (i < len(row) - 1 and row[i + 1])
        total += not is_trap
        next_row.append(is_trap)

    row = next_row

print(total)