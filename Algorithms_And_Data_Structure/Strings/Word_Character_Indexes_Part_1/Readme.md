# Strings To Do 3 — Word Character Indexes

## Overview

This assignment dives into string analysis and classic algorithm patterns: balance checking with counters and stacks, palindrome detection, and substring searching. Each challenge builds directly on the previous one.

---

## Challenges

### 1. Parens Valid

**Goal:** Check whether a string's parentheses are valid — every `(` must be closed by a `)`, and no `)` can appear before its matching `(`.

**Approach:** Use a single counter. Increment it for every `(`, decrement for every `)`. If the counter ever goes negative, a `)` appeared without a matching `(`. If the counter is not `0` at the end, some `(` were never closed.

```js
function parensValid(str) {
  var count = 0;

  for (var i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      count++;
    } else if (str[i] === ")") {
      count--;
      if (count < 0) return false;
    }
  }

  return count === 0;
}
```

**Examples:**

```js
console.log(parensValid("Y(3(p)p(3)r)s")); // true
console.log(parensValid("N(0(p)3")); // false — unclosed (
console.log(parensValid("N(0)t )0(k")); // false — ) before (
```

**Step-by-step for `"Y(3(p)p(3)r)s"`:**

| Char | Action      | Counter |
| ---- | ----------- | ------- |
| `(`  | increment   | 1       |
| `(`  | increment   | 2       |
| `)`  | decrement   | 1       |
| `(`  | increment   | 2       |
| `)`  | decrement   | 1       |
| `)`  | decrement   | 0       |
| end  | count === 0 | ✅ true |

---

### 2. Braces Valid

**Goal:** Extend the previous challenge to handle three types of brackets: `()`, `{}`, and `[]`. Brackets must be **properly nested** — a closing symbol must always match the most recently opened one.

**Approach:** Use a **stack**. Push every opening symbol. When a closing symbol is found, check if it matches the symbol on top of the stack. If not, or if the stack is empty, return `false`. At the end, the stack must be empty.

```js
function bracesValid(str) {
  var stack = [];
  var open = { "(": ")", "{": "}", "[": "]" };
  var close = { ")": "(", "}": "{", "]": "[" };

  for (var i = 0; i < str.length; i++) {
    var ch = str[i];

    if (open[ch]) {
      stack.push(ch);
    } else if (close[ch]) {
      if (stack.length === 0 || stack[stack.length - 1] !== close[ch]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}
```

**Examples:**

```js
console.log(bracesValid("W(a{t}s[o(n{c}o)m]e)h[e{r}e]!")); // true
console.log(bracesValid("D(i{a}l[t]o)n{e")); // false — { never closed
console.log(bracesValid("A(1)s[O(n]0{t)0}k")); // false — wrong nesting order
```

**Why a stack and not a counter?**

A counter works for a single bracket type but fails with multiple types. For example, `([)]` has balanced counts but is invalid because `]` closes `[` while `(` is still open. A stack tracks the exact nesting order.

**Step-by-step for `"A(1)s[O(n]0{t)0}k"` (invalid):**

| Char | Stack after  | Note                                |
| ---- | ------------ | ----------------------------------- |
| `(`  | `['(']`      | push                                |
| `)`  | `[]`         | pop `(` ✅                          |
| `[`  | `['[']`      | push                                |
| `(`  | `['[', '(']` | push                                |
| `]`  | —            | top is `(`, expected `[` → ❌ false |

---

### 3a. Is Palindrome — Strict

**Goal:** Determine whether a string is a palindrome. Case-sensitive; spaces and punctuation count.

**Approach:** Compare characters from the front and back, moving toward the center. If any pair doesn't match, return `false`.

```js
function isPalindrome(str) {
  for (var i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true;
}
```

**Examples:**

```js
console.log(isPalindrome("a x a")); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("Dud")); // false — 'D' ≠ 'd'
console.log(isPalindrome("oho!")); // false — 'o' ≠ '!'
```

---

### 3b. Is Palindrome — Lenient

**Goal:** Same as above, but **ignore spaces, punctuation, and capitalization**.

**Approach:** Strip all non-alphanumeric characters with a regex and convert to lowercase, then apply the same comparison logic.

```js
function isPalindromeLenient(str) {
  var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (var i = 0; i < Math.floor(cleaned.length / 2); i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) return false;
  }
  return true;
}
```

**Example:**

```js
console.log(isPalindromeLenient("Able was I, ere I saw Elba")); // true
```

> After cleaning: `"ablewasiereisaw elba"` → `"ablewasiereisawelba"` — reads the same forwards and backwards.

---

### 4a. Longest Palindrome — Strict

**Goal:** Find the longest palindromic **substring** within a string. All characters including spaces and punctuation are considered.

**Approach:** Use a nested loop to generate every possible substring. Check each with `isPalindrome()` and keep track of the longest one found.

```js
function longestPalindrome(str) {
  var longest = "";

  for (var i = 0; i < str.length; i++) {
    for (var j = i + 1; j <= str.length; j++) {
      var sub = str.slice(i, j);
      if (isPalindrome(sub) && sub.length > longest.length) {
        longest = sub;
      }
    }
  }

  return longest;
}
```

**Examples:**

```js
console.log(longestPalindrome("what up, daddy-o?")); // "dad"
console.log(longestPalindrome("uh... not much")); // "..."
console.log(longestPalindrome("Yikes! my favorite racecar erupted!")); // "e racecar e"
```

---

### 4b. Longest Palindrome — Lenient

**Goal:** Same as above, but **ignore spaces, punctuation, and capitalization** when searching for palindromes.

**Approach:** Clean the string first, find the longest palindrome in the cleaned version, then return that cleaned substring as the result.

```js
function longestPalindromeLenient(str) {
  var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  var longestCleaned = "";

  for (var i = 0; i < cleaned.length; i++) {
    for (var j = i + 1; j <= cleaned.length; j++) {
      var sub = cleaned.slice(i, j);
      if (isPalindrome(sub) && sub.length > longestCleaned.length) {
        longestCleaned = sub;
      }
    }
  }

  return longestCleaned;
}
```

**Example:**

```js
console.log(longestPalindromeLenient("Hot puree eruption!")); // "tpureeerupt"
```

> `"Hot puree eruption!"` cleaned → `"hotpureeeruption"`. The longest palindrome within it is `"tpureeerupt"`.

---

## Concepts Used

| Concept                            | Where Applied                      |
| ---------------------------------- | ---------------------------------- |
| Counter variable                   | Parens Valid                       |
| Stack (array as LIFO)              | Braces Valid                       |
| Object as a lookup map             | Braces Valid                       |
| Two-pointer comparison             | Is Palindrome (both versions)      |
| Regex `.replace(/[^a-z0-9]/g, "")` | Lenient palindrome versions        |
| Nested loop (all substrings)       | Longest Palindrome (both versions) |
| `str.slice(i, j)`                  | Longest Palindrome                 |

---

## Key Concepts Explained

### What is a Stack?

A stack is a data structure that works **last in, first out (LIFO)** — like a stack of plates. You can only add (`push`) or remove (`pop`) from the top. In `bracesValid`, the stack remembers which brackets were opened so we can verify each closing bracket matches the most recent one.

```
Push '('  → stack: ['(']
Push '{'  → stack: ['(', '{']
Pop  '}'  → matches '{' ✅ → stack: ['(']
Pop  ')'  → matches '(' ✅ → stack: []
```

### What is a Palindrome?

A palindrome reads the same forwards and backwards:

```
r a c e c a r
↑           ↑   r === r ✅
  ↑       ↑     a === a ✅
    ↑   ↑       c === c ✅
      ↑         e  (middle, skip)
```
