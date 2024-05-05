/**
 * A trie (pronounced "try"), or Prefix Tree, is a tree-like data structure
 * used to store a set of strings in a way that makes it easy to check
 * whether any particular string OR any prefix of any particular string
 * is in the set.
 *
 * See: https://en.wikipedia.org/wiki/Trie
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }

  hasChild(char) {
    return this.children.has(char);
  }

  getChild(char) {
    return this.children.get(char);
  }

  addChild(char) {
    if (!this.hasChild(char)) {
      this.children.set(char, new TrieNode());
    }

    return this.getChild(char);
  }
}

class Trie {
  constructor(words = []) {
    this.root = new TrieNode();

    for (let word of words) {
      this.insert(word);
    }
  }

  /**
   * Inserts a word into the trie.
   *
   * @param {string} word - The word to be inserted into the trie.
   */
  insert(word) {
    let node = this.root;

    for (let char of word) {
      node = node.addChild(char);
    }

    node.isEndOfWord = true;
  }

  /**
   * Returns `true` if `word` is in the trie and `false` otherwise.
   *
   * @param {string} word - The word to search for in the trie.
   * @returns {boolean} - True if the word exists in the trie, false otherwise.
   */
  contains(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.hasChild(char)) {
        return false;
      }

      node = node.getChild(char);
    }

    return node.isEndOfWord;
  }

  has(word) {
    return contains(word);
  }

  includes(word) {
    return contains(word);
  }

  /**
   * Returns `true` if any word in the trie has `prefix` as a prefix
   * and `false` otherwise.
   *
   * @param {string} prefix - The prefix to be checked against the words stored in the trie.
   * @returns {boolean}
   */
  containsPrefix(prefix) {
    let node = this.root;

    for (let char of prefix) {
      if (!node.hasChild(char)) {
        return false;
      }

      node = node.getChild(char);
    }

    return true;
  }
}

if (require.main === module) {
  // Add your own tests here


}

module.exports = {
  TrieNode,
  Trie,
}
