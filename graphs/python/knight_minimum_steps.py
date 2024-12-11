"""
Functions for finding minimum steps for a knight to reach a target position on a chessboard.
"""
from collections import deque


def add_coordinates(first, second):
    return (sum(pair) for pair in zip(first, second))


def in_bounds(size, pos):
    x, y = pos

    return 0 <= x < size and 0 <= y < size


def knight_minimum_steps(chessboard_size, start_pos, target_pos):
    moves = [
        (-2, -1), (-2, 1), (-1, -2), (-1, 2),
        (1, -2), (1, 2), (2, -1), (2, 1)
    ]

    queue = deque([(start_pos, 0)])

    visited = {start_pos}

    while queue:
        pos, steps = queue.popleft()

        if pos == target_pos:
            return steps

        for move in moves:
            new_pos = add_coordinates(pos, move)

            if new_pos in visited or not in_bounds(chessboard_size, new_pos):
                continue

            queue.append((new_pos, steps + 1))
            visited.add(new_pos)

    return -1


if __name__ == '__main__':
    print(knight_minimum_steps(8, (3, 3), (4, 5)))
    print(knight_minimum_steps(8, (3, 3), (4, 4)))
    print(knight_minimum_steps(8, (3, 3), (3, 4)))
    print(knight_minimum_steps(8, (3, 3), (5, 5)))
    print(knight_minimum_steps(8, (0, 0), (7, 7)))
