# Strings To Do 12 — Interleaving and Palindrome Problems

## Overview

Four challenges covering two advanced string topics: **interleaving** (combining two strings while keeping their order) and **palindrome repair** (adding or removing one character to make a string read the same both ways).

---

## Challenges

### 1. Are Strings Loosely Interleaved

**Goal:** Check if a third string is made by merging two strings together, keeping the characters of each in their original order.

```js
function areStringsLooselyInterleaved(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;

  let dp = Array(s1.length + 1)
    .fill(null)
    .map(() => Array(s2.length + 1).fill(false));
  dp[0][0] = true;

  for (let i = 1; i <= s1.length; i++)
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  for (let j = 1; j <= s2.length; j++)
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i][j] =
        (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }

  return dp[s1.length][s2.length];
}
```

**Examples:**

```js
console.log(areStringsLooselyInterleaved("dne", "ail", "daniel")); // true
console.log(areStringsLooselyInterleaved("dne", "ail", "dalein")); // false
```

**How `"daniel"` is formed from `"dne"` and `"ail"`:**

```
d  a  n  i  e  l
↑     ↑     ↑       ← from "dne"
   ↑     ↑     ↑    ← from "ail"
```

The characters from each string appear in the same order they were in originally.

**How the DP table works:**

`dp[i][j]` asks: _"can I form the first `i+j` characters of s3 using the first `i` of s1 and first `j` of s2?"_

- If I used s1's last char: check `dp[i-1][j]` and that `s1[i-1] === s3[i+j-1]`
- If I used s2's last char: check `dp[i][j-1]` and that `s2[j-1] === s3[i+j-1]`

---

### 2. All Loosely Interleaved Strings

**Goal:** Generate every possible way to merge two strings together while keeping each string's character order intact.

```js
function allLooselyInterleavedStrings(s1, s2) {
  let results = [];

  function build(rem1, rem2, current) {
    if (rem1.length === 0 && rem2.length === 0) {
      results.push(current);
      return;
    }
    if (rem1.length > 0) build(rem1.slice(1), rem2, current + rem1[0]);
    if (rem2.length > 0) build(rem1, rem2.slice(1), current + rem2[0]);
  }

  build(s1, s2, "");
  return [...new Set(results)];
}
```

**Example:**

```js
console.log(allLooselyInterleavedStrings("ab", "yz"));
// ["abyz", "aybz", "ayzb", "yabz", "yazb", "yzab"]
```

**How the recursion works:** At every step, you have two choices — take the next character from s1, or take the next character from s2. Explore both paths recursively until both strings are empty.

```
build("ab", "yz", "")
 ├─ take 'a' → build("b", "yz", "a")
 │   ├─ take 'b' → build("", "yz", "ab") → "abyz", "abzy"...
 │   └─ take 'y' → build("b", "z", "ay") → ...
 └─ take 'y' → build("ab", "z", "y")
     └─ ...
```

The `Set` at the end removes any duplicate results that may occur with repeated characters.

---

### 3. Make Palindrome by Removing One

**Goal:** Find the index of the first character that, when removed, makes the string a palindrome. Return `-1` if the string is already a palindrome.

```js
function makePalindromeByRemovingOne(str) {
  function isPalindrome(s) {
    let l = 0,
      r = s.length - 1;
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  if (isPalindrome(str)) return -1;

  for (let i = 0; i < str.length; i++) {
    if (isPalindrome(str.slice(0, i) + str.slice(i + 1))) return i;
  }

  return -1;
}
```

**Examples:**

```js
console.log(makePalindromeByRemovingOne("bene")); // 0  — remove 'b' → "ene" ✓
console.log(makePalindromeByRemovingOne("dude")); // 3  — remove 'e' → "dud" ✓
console.log(makePalindromeByRemovingOne("bub")); // -1 — already a palindrome
```

**Walking through `"bene"`:**

| Remove index | Resulting string | Palindrome?       |
| ------------ | ---------------- | ----------------- |
| 0 (b)        | `"ene"`          | ✅ yes — return 0 |
| 1 (e)        | `"bne"`          | ❌                |
| 2 (n)        | `"bee"`          | ❌                |
| 3 (e)        | `"ben"`          | ❌                |

---

### 4. Make Palindrome by Adding One

**Goal:** Return the character that, when added somewhere, makes the string a palindrome. Return `""` if it's already a palindrome.

```js
function makePalindromeByAddingOne(str) {
  function isPalindrome(s) {
    let l = 0,
      r = s.length - 1;
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  if (isPalindrome(str)) return "";

  let l = 0,
    r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return str[r];
    l++;
    r--;
  }

  return "";
}
```

**Examples:**

```js
console.log(makePalindromeByAddingOne("tutu")); // "u"
console.log(makePalindromeByAddingOne("dude")); // "e"
console.log(makePalindromeByAddingOne("dad")); // ""
```

**How it works for `"dude"`:**

```
d  u  d  e
↑           l=0
         ↑  r=3

str[l]='d', str[r]='e' → mismatch → return 'e'
```

Adding `'e'` at the start gives `"edude"` — not a palindrome. But adding `'e'` in the right spot (e.g. `"educed"` won't work either — the insight is that when `d ≠ e`, you need to add the right-pointer's character somewhere on the left side, giving `"edude"`. Actually the cleanest result: add `'e'` at position 0 → `"edude"`: e-d-u-d-e ✓ that IS a palindrome.

---

## Two-Pointer Pattern (Challenges 3 & 4)

Both palindrome challenges use the same core technique:

```
Start with one pointer at each end, move them inward.
If both sides match → move inward.
If they don't match → you've found the problem spot.
```

```
b  e  n  e
↑           l
         ↑  r

b ≠ e → mismatch found at positions 0 and 3
```

---

## Concepts Used

| Concept                           | Where Applied             |
| --------------------------------- | ------------------------- |
| Dynamic programming (2D table)    | Are Strings Interleaved   |
| Recursion + backtracking          | All Interleaved Strings   |
| `new Set()` to remove duplicates  | All Interleaved Strings   |
| `str.slice(0,i) + str.slice(i+1)` | Remove One Palindrome     |
| Two-pointer technique             | Add/Remove One Palindrome |
