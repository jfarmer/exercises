const { findWordsOnBoggleBoard } = require('./findWordsOnBoggleBoard');

describe('findWordsOnBoggleBoard', () => {
  test('Empty Board', () => {
    const board = [];
    const dictionary = ['hello', 'world'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set());
  });

  test('Single Character Board', () => {
    const board = [['a']];
    const dictionary = ['a'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['a']));
  });

  test('Board with No Valid Words', () => {
    const board = [
      ['x', 'y', 'z'],
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ];
    const dictionary = ['hello', 'world'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set());
  });

  test('Board with Multiple Valid Words', () => {
    const board = [
      ['c', 'a', 't'],
      ['b', 'a', 't'],
      ['d', 'o', 'g'],
    ];
    const dictionary = ['cat', 'rat', 'bat', 'bog', 'dog', 'car'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'bog', 'bat', 'dog']));
  });

  test('Board with Duplicate Words', () => {
    const board = [
      ['c', 'a', 't'],
      ['r', 'a', 't'],
      ['d', 'o', 'g'],
    ];
    const dictionary = ['cat', 'rat', 'dog', 'cat'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'rat', 'dog']));
  });

  test('Board with Words of Different Lengths', () => {
    const board = [
      ['c', 'a', 't', 'r'],
      ['r', 'a', 't', 'a'],
      ['d', 'o', 'g', 'u'],
      ['q', 'u', 'e', 'e'],
    ];
    const dictionary = ['cat', 'rat', 'dog', 'queue', 'era'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'rat', 'dog', 'queue']));
  });

  test('Board with Words Starting from Different Positions', () => {
    const board = [
      ['c', 'a', 't', 'r'],
      ['r', 'a', 't', 'a'],
      ['d', 'o', 'g', 'e'],
      ['q', 'u', 'e', 'u'],
    ];
    const dictionary = ['cat', 'rat', 'dog', 'ate', 'queue', 'era'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'rat', 'dog', 'ate', 'queue']));
  });

  test('Board with Boundary Cases', () => {
    const board = [
      ['c', 'a', 't', 'r'],
      ['r', 'a', 't', 'a'],
      ['d', 'o', 'g', 'd'],
      ['q', 'u', 'e', 'e'],
    ];
    const dictionary = ['cat', 'rat', 'dog', 'care', 'edge'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'rat', 'dog', 'edge']));
  });

  test('Board with Non-Square Dimensions', () => {
    const board = [
      ['c', 'a', 't'],
      ['r', 'x', 'z'],
      ['d', 'o', 'g'],
      ['q', 'u', 'e'],
    ];
    const dictionary = ['cat', 'rat', 'dog', 'queue'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['cat', 'rat', 'dog']));
  });

  test('Board with Large Dimensions and Dictionary', () => {
    const board = [
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
      ['u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd'],
      ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
      ['o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
      ['y', 'z', 'a', 'b', 'c', 'd', 'e', 'a', 'g', 'h'],
      ['i', 'j', 'k', 'l', 'm', 'n', 'v', 'p', 'q', 'r'],
      ['s', 't', 'u', 'v', 'w', 'a', 'y', 'z', 'a', 'b'],
      ['c', 'd', 'e', 'f', 'j', 'h', 'i', 'j', 'k', 'l'],
      ['m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'],
    ];
    const dictionary = ['hello', 'world', 'javascript', 'react', 'node', 'python', 'ruby', 'java'];
    const result = findWordsOnBoggleBoard(board, dictionary);
    expect(result).toEqual(new Set(['java', 'node']));
  });
});
