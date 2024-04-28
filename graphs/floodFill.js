/**
 * Simulate the flood fill algorithm used in graphic applications like MS-Paint. Given a 2D screen
 * represented by an MxN array where each number represents a different color, a start pixel, and
 * a new color, replace the color of the given pixel and all adjacent same colored pixels with the
 * new color.
 *
 * For example, on a screen with the following configuration, and start pixel (0, 1) and new color 3,
 * the screen should change as follows:
 * Initial Screen:
 * [
 *   [1, 1, 0],
 *   [1, 2, 1],
 *   [0, 1, 1]
 * ]
 * Resulting Screen:
 * [
 *   [3, 3, 0],
 *   [3, 2, 1],
 *   [0, 1, 1]
 * ]
 */
function floodFill(screen, startX, startY, newColor, curColor = null) {
  let height = screen.length;
  let width = screen[0].length;

  if (startX < 0 || startY < 0 || startX >= screen.length || startY >= screen[0].length) {
    return;
  }

  if (curColor === null) {
    curColor = screen[startX][startY];
  }

  if (screen[startX][startY] !== curColor) {
    return;
  }

  screen[startX][startY] = newColor;

  floodFill(screen, startX - 1, startY,     newColor, curColor);
  floodFill(screen, startX + 1, startY,     newColor, curColor);
  floodFill(screen, startX,     startY + 1, newColor, curColor);
  floodFill(screen, startX,     startY - 1, newColor, curColor);
}

if (require.main === module) {
  let screen = [[ 1, 1, 1, 1, 1, 1, 1, 1 ],
                [ 1, 1, 1, 1, 1, 1, 0, 0 ],
                [ 1, 0, 0, 1, 1, 0, 1, 1 ],
                [ 1, 2, 2, 2, 2, 0, 1, 0 ],
                [ 1, 1, 1, 2, 2, 0, 1, 0 ],
                [ 1, 1, 1, 2, 2, 2, 2, 0 ],
                [ 1, 1, 1, 1, 1, 2, 1, 1 ],
                [ 1, 1, 1, 1, 1, 2, 2, 1 ] ];

  floodFill(screen, 0, 0, 'x');
  console.log(screen);
}

module.exports = {
  floodFill,
}
