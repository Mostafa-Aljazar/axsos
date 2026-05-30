# String To Do 8 — Word Array Manipulations

## Overview

Four challenges about treating a string as a collection of words. The core pattern across all of them is the same: split the string into an array, do something to the array, then put it back together. Each challenge also has a bonus version that handles punctuation and capitalization more carefully.

---

## Challenges

### 1. String to Word Array

**Goal:** Break a sentence into an array of individual words. Handle any kind of whitespace — spaces, tabs, and newlines all count as separators.

```js
function stringToWordArray(str) {
  return str.split(/\s+/).filter((word) => word.length > 0);
}
```

**Examples:**

```js
console.log(stringToWordArray("Life is not a drill!"));
// ["Life", "is", "not", "a", "drill!"]

console.log(stringToWordArray("Hello   world\nfoo\tbar"));
// ["Hello", "world", "foo", "bar"]
```

**How it works:**

`/\s+/` is a regex that matches one or more whitespace characters (space, tab, newline). Using it as the separator means double spaces and mixed whitespace all get handled cleanly. The `.filter()` at the end removes any empty strings that can appear if the string starts or ends with whitespace.

---

### 2. Reverse Word Order

**Goal:** Flip the order of the words in a sentence.

```js
function reverseWordOrder(str) {
  return str.split(/\s+/).reverse().join(" ");
}
```

**Example:**

```js
console.log(reverseWordOrder("This is a test"));
// "test a is This"
```

**Step by step:**

| Step           | Result                        |
| -------------- | ----------------------------- |
| `split(/\s+/)` | `["This", "is", "a", "test"]` |
| `.reverse()`   | `["test", "a", "is", "This"]` |
| `.join(" ")`   | `"test a is This"`            |

**Bonus version** — also capitalizes the new first word and lowercases the new last word:

```js
function reverseWordOrderBonus(str) {
  let words = str.split(/\s+/).reverse();

  words[0] = words[0][0].toUpperCase() + words[0].slice(1);

  let last = words[words.length - 1];
  words[words.length - 1] = last[0].toLowerCase() + last.slice(1);

  return words.join(" ");
}
```

```js
console.log(reverseWordOrderBonus("Life is not a drill, go for it!"));
// "It! for go drill, a not is life"
```

---

### 3. Longest Word

**Goal:** Find and return the longest word in a sentence.

```js
function longestWord(str) {
  let words = str.split(/\s+/);
  let longest = "";

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}
```

**Example:**

```js
console.log(longestWord("Snap crackle pop makes the world go round!"));
// "crackle"
```

**Bonus version** — strips punctuation before comparing lengths, so `"round!"` competes as `"round"`:

```js
function longestWordBonus(str) {
  let words = str.split(/\s+/);
  let longest = "";

  for (let i = 0; i < words.length; i++) {
    let clean = words[i].replace(/[^a-zA-Z]/g, "");
    if (clean.length > longest.length) {
      longest = clean;
    }
  }

  return longest;
}
```

```js
console.log(longestWordBonus("Snap crackle pop makes the world go round!"));
// "crackle"
```

---

### 4. Unique Words

**Goal:** Return only the words that appear exactly once. Words that appear more than once get removed entirely.

```js
function uniqueWords(str) {
  let words = str.split(/\s+/);
  let count = {};

  for (let i = 0; i < words.length; i++) {
    count[words[i]] = (count[words[i]] || 0) + 1;
  }

  let result = [];
  for (let i = 0; i < words.length; i++) {
    if (count[words[i]] === 1) result.push(words[i]);
  }

  return result.join(" ");
}
```

**Example:**

```js
console.log(uniqueWords("Sing! Sing a song; sing out loud; sing out strong."));
// "Sing! Sing a song; loud; strong."
```

In the basic version, `"Sing!"`, `"Sing"`, and `"sing"` are all treated as **different words** because punctuation and capitalization matter.

**Bonus version** — treats `"Sing!"`, `"Sing"`, and `"sing"` as the same word when counting:

```js
function uniqueWordsBonus(str) {
  let words = str.split(/\s+/);
  let count = {};

  for (let i = 0; i < words.length; i++) {
    let clean = words[i].replace(/[^a-zA-Z]/g, "").toLowerCase();
    count[clean] = (count[clean] || 0) + 1;
  }

  let result = [];
  for (let i = 0; i < words.length; i++) {
    let clean = words[i].replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (count[clean] === 1) {
      result.push(words[i].replace(/[^a-zA-Z]/g, ""));
    }
  }

  return result.join(" ");
}
```

```js
console.log(
  uniqueWordsBonus("Sing a song! Sing a song; sing out loud and strong."),
);
// "out loud and strong"
```

---

## Core Pattern Used in All 4 Challenges

```
1. Split the string into an array of words
2. Do something to the words
3. Join the array back into a string
```

```js
str
  .split(/\s+/) // "Hello World" → ["Hello", "World"]
  // ... do stuff ...
  .join(" "); // ["Hello", "World"] → "Hello World"
```

---

## Regex Quick Reference

| Pattern        | What it matches                                          |
| -------------- | -------------------------------------------------------- |
| `/\s+/`        | One or more whitespace characters (space, tab, newline)  |
| `/[^a-zA-Z]/g` | Any character that is NOT a letter (removes punctuation) |

---

## Concepts Used

| Concept                         | Where Applied                    |
| ------------------------------- | -------------------------------- |
| `.split(/\s+/)`                 | All challenges                   |
| `.reverse()`                    | Reverse Word Order               |
| `.join(" ")`                    | Reverse Word Order, Unique Words |
| `for` loop with length tracking | Longest Word                     |
| Object as a word counter        | Unique Words                     |
| `.replace(/[^a-zA-Z]/g, "")`    | Bonus versions                   |
| `.toLowerCase()`                | Bonus versions                   |
