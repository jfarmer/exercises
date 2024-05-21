// Really "Infinity" should signal "Can't make change" across the board
function coinChange(coins, amount) {
  let result = coinChangeR(coins, amount);

  return result === Infinity ? -1 : result;
}

function coinChangeR(coins, amount, memo = new Map()) {
  if (memo.has(amount)) {
    return memo.get(amount);
  }

  if (amount === 0) {
    return 0;
  }

  if (amount < 0) {
    return Infinity;
  }

  let minCoins = Infinity;

  for (let coin of coins) {
    if (coin === amount) {
      minCoins = 1;
    } else if (coin < amount) {
      let minWithCoin = 1 + coinChangeR(coins, amount - coin, memo);
      minCoins = Math.min(minCoins, minWithCoin);
    }
  }

  memo.set(amount, minCoins);

  return minCoins;
}

function coinChangeBottomUp(coins, amount) {
  let dp = Array(amount + 1).fill(Infinity);

  dp[0] = 0;

  for(let amt = 1; amt < dp.length; amt++) {
      for(let coin of coins) {
        if (coin === amt) {
          dp[amt] = 1
        } else if (coin < amt) {
          let minWithCoin = 1 + dp[amt - coin];
          dp[amt] = Math.min(dp[amt], minWithCoin);
        }
      }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
