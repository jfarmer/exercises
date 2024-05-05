let { Trie } = require('./Trie');
/**
 * Given an N-by-N array of characters (representing a Boggle board)
 * and a list of valid words, return an array of all possible words
 * that can be formed by a sequence of adjacent squares.
 *
 * For a given square, any of the neighboring 8 squares is considered
 * adjacent.
 *
 * @param {string[][]} board - The n-by-n Boggle board
 * @param {string} dictionary - A list of valid words
 * @returns {string[]} - List of valid words found on the board
 */
function findWordsOnBoggleBoard(board, dictionary) {
  let trie = new Trie(dictionary);
  let words = new Set();

  if (board.length === 0 || board[0].length === 0) {
    return words;
  }

  let rows = board.length;
  let cols = board[0].length;


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(board, i, j, trie.root, '', (trieNode, str) => {
        if (trieNode.isEndOfWord) {
          words.add(str);
        }
      })
    }
  }

  return words;
}

const DIRECTIONS = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [1, 1], [1, -1], [-1, 1], [-1, -1]
];
const VISITED = '#';

function dfs(grid, row, col, trieNode, currentStr, callback) {
  let rows = grid.length;
  let cols = grid[0].length;

  if (row < 0 || col < 0 || row >= rows || col >= cols) {
    return;
  }

  let currentChar = grid[row][col];

  if (currentChar === VISITED || !trieNode.hasChild(currentChar)) {
    return;
  }

  grid[row][col] = VISITED;
  currentStr += currentChar;
  trieNode = trieNode.getChild(currentChar);

  callback(trieNode, currentStr);

  for (let [dr, dc] of DIRECTIONS) {
    dfs(grid, row + dr, col + dc, trieNode, currentStr, callback);
  }

  grid[row][col] = currentChar;
}

if (require.main === module) {

}

module.exports = {
  findWordsOnBoggleBoard,
}
