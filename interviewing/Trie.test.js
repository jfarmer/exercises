const { Trie } = require('./Trie');

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('insert', () => {
    it('should insert a word into the trie', () => {
      trie.insert('apple');
      expect(trie.contains('apple')).toBe(true);
    });

    it('should insert every prefix of a word into the trie', () => {
      let word = 'apple';
      trie.insert(word);

      for (let i = 0; i < word.length; i++) {
        let prefix = word.slice(0, i);
        expect(trie.containsPrefix(prefix)).toBe(true);
      }
    });

    it('should insert multiple words into the trie', () => {
      let words = ['apple', 'banana', 'pear'];
      for (let word of words) {
        trie.insert(word);
        expect(trie.contains(word)).toBe(true);
      }

      for (let word of words) {
        expect(trie.contains(word)).toBe(true);
      }
    });
  });

  describe('contains', () => {
    it('should return true if the word is in the trie', () => {
      trie.insert('apple');
      expect(trie.contains('apple')).toBe(true);
    });

    it('should return false if the word is not in the trie', () => {
      trie.insert('apple');
      expect(trie.contains('banana')).toBe(false);
    });

    it('should handle empty trie', () => {
      expect(trie.contains('apple')).toBe(false);
    });
  });

  describe('containsPrefix', () => {
    it('should return true if the prefix is present in the trie', () => {
      trie.insert('apple');
      trie.insert('banana');
      expect(trie.containsPrefix('app')).toBe(true);
      expect(trie.containsPrefix('ban')).toBe(true);
    });

    it('should return false if the prefix is not present in the trie', () => {
      trie.insert('apple');
      trie.insert('banana');
      expect(trie.containsPrefix('bann')).toBe(false);
    });

    it('should return true for an empty prefix', () => {
      trie.insert('apple');
      expect(trie.containsPrefix('')).toBe(true);
    });

    it('should handle empty trie', () => {
      expect(trie.containsPrefix('app')).toBe(false);
    });
  });

  describe('constructor', () => {
    it('should insert words from the initial array', () => {
      let words = ['apple', 'banana', 'pear'];
      trie = new Trie(words);

      for (let word of words) {
        expect(trie.contains(word)).toBe(true);
      }
    });
  });
});
