# Strings To Do 11 — Advanced Strings and Stock Market Challenges

## Overview

Eight challenges split into two themes: advanced string problems (permutations, pangrams) and stock market trading strategies. The string problems use sorting and frequency counting. The stock problems build on each other from simple to complex.

---

## String Challenges

### 1. Is Permutation

**Goal:** Check if two strings contain exactly the same characters (in any order).

```js
function isPermutation(str1, str2) {
  if (str1.length !== str2.length) return false;
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

function isPermutationBonus(str1, str2) {
  return isPermutation(str1.toLowerCase(), str2.toLowerCase());
}
```

**Examples:**

```js
console.log(isPermutation("mister", "stimer")); // true
console.log(isPermutation("mister", "sister")); // false
console.log(isPermutationBonus("Mister", "stimer")); // true
```

**The trick:** Sorting both strings puts their characters in the same order. If the sorted versions are identical, they're permutations of each other.

```
"mister" sorted → "eimrst"
"stimer" sorted → "eimrst"
                    equal ✓
```

---

### 2. All Permutations

**Goal:** Generate every possible rearrangement of a string. A 4-letter string has 4! = 24 permutations.

```js
function allPermutations(str) {
  if (str.length <= 1) return [str];

  let results = [];

  for (let i = 0; i < str.length; i++) {
    let rest = str.slice(0, i) + str.slice(i + 1);
    let perms = allPermutations(rest);
    for (let j = 0; j < perms.length; j++) {
      results.push(str[i] + perms[j]);
    }
  }

  return results;
}
```

**Example:**

```js
let perms = allPermutations("team");
console.log(perms.length); // 24
```

**How it works:** Pick each character as the first letter, then recursively generate all permutations of the remaining characters.

```
"team" → pick 't', permute "eam" → [team, tema, taem, tame, ...]
       → pick 'e', permute "tam" → [etam, etma, eamt, ...]
       → ... and so on
```

---

### 3. Is Pangram

**Goal:** Check if a sentence uses every letter of the alphabet at least once.

```js
function isPangram(str) {
  str = str.toLowerCase();
  for (let c = 97; c <= 122; c++) {
    if (str.indexOf(String.fromCharCode(c)) === -1) return false;
  }
  return true;
}
```

**Examples:**

```js
console.log(isPangram("How quickly daft jumping zebras vex!")); // true
console.log(isPangram("abcdef ghijkl mno pqrs tuv wxy, not so fast!")); // false
```

`String.fromCharCode(97)` = `'a'`, `String.fromCharCode(122)` = `'z'`. The loop checks all 26 letters one by one.

---

### 4. Is Perfect Pangram

**Goal:** Every letter appears **exactly once** (ignore spaces and punctuation).

```js
function isPerfectPangram(str) {
  let letters = str.toLowerCase().replace(/[^a-z]/g, "");
  if (letters.length !== 26) return false;
  return isPangram(letters);
}
```

**Examples:**

```js
console.log(isPerfectPangram("Mr. Jock, TV quiz PhD, bags few lynx.")); // true
console.log(
  isPerfectPangram("Playing jazz vibe chords quickly excites my wife."),
); // false
```

After stripping non-letters, the result must be exactly 26 characters AND contain every letter — both conditions must be true.

---

## Stock Market Challenges

All four challenges use this price array:

```
[6, 4, 6, 5, 9, 7, 6, 12, 2, 6, 11, 2, 4]
```

---

### 5. Best Single Buy and Sell

**Goal:** One buy, one sell. Find the maximum profit.

```js
function bestSingleBuySell(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    let profit = prices[i] - minPrice;
    if (profit > maxProfit) maxProfit = profit;
    if (prices[i] < minPrice) minPrice = prices[i];
  }

  return maxProfit;
}
```

```js
console.log(bestSingleBuySell([6, 4, 6, 5, 9, 7, 6, 12, 2, 6, 11, 2, 4])); // 9
// Buy at 2, sell at 11
```

Walk through the prices keeping track of the cheapest price seen so far. At every step, ask: _"if I sell today, how much profit do I make?"_ Keep the best answer.

---

### 6. Multiple Buy and Sell

**Goal:** Buy and sell as many times as you want. You can't hold two shares at once.

```js
function multipleBuySell(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}
```

```js
console.log(multipleBuySell([6, 4, 6, 5, 9, 7, 6, 12, 2, 6, 11, 2, 4])); // 23
```

**The insight:** Every upward price movement is profit you can capture. If it goes up, add the difference. If it goes down, skip it.

```
4→6 (+2), 5→9 (+4), 6→12 (+6), 2→6 (+4), 6→11 (+5), 2→4 (+2) = 23
```

---

### 7. Two Transactions Max

**Goal:** At most two buys and two sells. What's the maximum profit?

```js
function maxProfitTwoTransactions(prices) {
  let hold1 = -prices[0],
    sold1 = 0;
  let hold2 = -prices[0],
    sold2 = 0;

  for (let i = 1; i < prices.length; i++) {
    hold1 = Math.max(hold1, -prices[i]);
    sold1 = Math.max(sold1, hold1 + prices[i]);
    hold2 = Math.max(hold2, sold1 - prices[i]);
    sold2 = Math.max(sold2, hold2 + prices[i]);
  }

  return sold2;
}
```

```js
console.log(
  maxProfitTwoTransactions([6, 4, 6, 5, 9, 7, 6, 12, 2, 6, 11, 2, 4]),
); // 17
// Buy at 4, sell at 12 (+8). Buy at 2, sell at 11 (+9). Total = 17
```

**Four states tracked at each price:**

| State   | Meaning                                 |
| ------- | --------------------------------------- |
| `hold1` | Best profit while holding after 1st buy |
| `sold1` | Best profit after 1st sell              |
| `hold2` | Best profit while holding after 2nd buy |
| `sold2` | Best profit after 2nd sell ← **answer** |

---

### 8. K Transactions Max

**Goal:** At most K transactions. Generalize the problem for any number of trades.

```js
function maxProfitKTransactions(prices, k) {
  let n = prices.length;

  if (k >= Math.floor(n / 2)) return multipleBuySell(prices);

  let dp = Array(k + 1)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let t = 1; t <= k; t++) {
    let maxSoFar = -prices[0];
    for (let d = 1; d < n; d++) {
      dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxSoFar);
      maxSoFar = Math.max(maxSoFar, dp[t - 1][d] - prices[d]);
    }
  }

  return dp[k][n - 1];
}
```

```js
console.log(maxProfitKTransactions(prices, 1)); // 9  — same as challenge 5
console.log(maxProfitKTransactions(prices, 2)); // 17 — same as challenge 6
console.log(maxProfitKTransactions(prices, 10)); // 23 — same as unlimited
```

**How the table works:** `dp[t][d]` = the best profit possible using `t` transactions up to day `d`. Build it row by row, transaction by transaction.

**How challenges 5–8 connect:**

| Challenge | Trades allowed | Result           |
| --------- | -------------- | ---------------- |
| 5         | 1              | 9                |
| 6         | Unlimited      | 23               |
| 7         | 2              | 17               |
| 8         | K              | Any of the above |

---

## Concepts Used

| Concept                     | Where Applied        |
| --------------------------- | -------------------- |
| `.sort()` for comparison    | Is Permutation       |
| Recursion                   | All Permutations     |
| `String.fromCharCode()`     | Is Pangram           |
| Frequency map               | Is Perfect Pangram   |
| Greedy (track running min)  | Best Single Buy/Sell |
| Greedy (collect every rise) | Multiple Buy/Sell    |
| State machine (4 variables) | Two Transactions     |
| Dynamic programming         | K Transactions       |
