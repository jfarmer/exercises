function wordBreakR(string, wordDict, memo = new Map()) {
  if (memo.has(string)) {
    return memo.get(string);
  }

  if (wordDict.has(string)) {
    return true;
  }

  for (let i = 0; i < string.length; i++) {
    let prefix = string.substring(0, i);

    if (wordDict.has(prefix)) {
      let suffix = string.substring(i);
      if (wordBreakR(suffix, wordDict, memo)) {
        memo.set(string, true);
        return true;
      }
    }
  }

  memo.set(string, false);
  return false;
}

function wordBreak(string, wordDict) {
  return wordBreakR(string, new Set(wordDict));
}

if (require.main === module) {
  console.log(wordBreakR('a', ['b']));
}
