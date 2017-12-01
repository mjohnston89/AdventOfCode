import re

RE_DISC = re.compile(r'Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+).')

def main():
    data = []
    with open('input.txt') as f:
        data = f.read().strip().split('\n')

    class Disc(object):
        def __init__(self, id, positions, position):
            self.id = id
            self.positions = positions
            self.position = position

        def __repr__(self):
            return '<Disc.{}.{}.{}>'.format(self.id, self.positions, self.position)

        def get_state_at(self, time):
            return (self.position + time) % self.positions

    def done(discs, time):
        return all([disc.get_state_at(time + index + 1) == 0 for (index, disc) in enumerate(discs)])

    discs = [Disc(*map(int, RE_DISC.match(line).group(1, 2, 4))) for line in data]
    discs.append(Disc(7, 11, 0))
    time = 0

    while not done(discs, time):
        time += 1

    print('Result({})'.format(time))

if __name__ == '__main__':
    main()