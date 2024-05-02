/**
 * You are given a list of lexicographically sorted words from an alien language.
 * The letters in this language language, despite using ASCII characters, has
 * its own alphabetical order.
 *
 * Return the alphabetical order of all the letters found in the list of words.
 * If there's more than one possible answer, return any one of them. If there's
 * no possible order return an empty string.
 *
 * @param {string[]} words - List of words sorted lexicographically according to the alien language's alphabet.
 * @returns {string} - A possible alphabetical order of the alphabet for the alien language.
 */
function alienDictionaryOrder(words) {

}

if (require.main === module) {
  console.log(alienDictionaryOrder(["kaa","akcd","akca","cak","cad"]) === "kdac");
  console.log(alienDictionaryOrder(["z", "d"]) === "zd");
  console.log(alienDictionaryOrder(["ab", "a", "b"]) === "");
}

module.exports = {
  alienDictionaryOrder,
}
