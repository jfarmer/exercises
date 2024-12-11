/**
 * Given a square chessboard of N x N size, find the minimum number of steps a Knight will take
 * to reach from a given starting position to a target position. The positions are given as
 * (x, y) coordinates on the chessboard.
 */
function knightMinimumSteps(chessboardSize, startPos, targetPos) {
  // All possible moves a knight can make
  const moves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  // Create a queue for BFS with initial position and steps
  const queue = [[startPos[0], startPos[1], 0]];

  // Keep track of visited positions
  const visited = new Set();
  visited.add(`${startPos[0]},${startPos[1]}`);

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    // If we've reached the target, return steps
    if (x === targetPos[0] && y === targetPos[1]) {
      return steps;
    }

    // Try all possible knight moves
    for (const [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;

      // Check if the new position is valid and unvisited
      if (isValidPosition(newX, newY, chessboardSize) &&
          !visited.has(`${newX},${newY}`)) {
        queue.push([newX, newY, steps + 1]);
        visited.add(`${newX},${newY}`);
      }
    }
  }

  // If target is unreachable
  return -1;
}

function isValidPosition(x, y, size) {
  return x >= 0 && x < size && y >= 0 && y < size;
}

console.log(knightMinimumSteps(8, [0, 0], [7, 7]));

module.exports = {
  knightMinimumSteps,
}
