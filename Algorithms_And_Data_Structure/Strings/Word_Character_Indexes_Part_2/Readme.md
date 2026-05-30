# Strings To Do 4 — Word Character Indexes Part 2

## Overview

This assignment continues string manipulation in JavaScript, covering character comparison, string formatting, suffix finding, range compression, and regex-based transformations.

---

## Challenges

### 1. Is Word Alphabetical

**Goal:** Check whether all letters in a string are in alphabetical order (after removing non-letter characters and lowercasing).

**Approach:** Clean the string with `.toLowerCase()` and a regex, then loop through comparing each character to the next. JavaScript compares characters by their Unicode value, so `'a' < 'b'` is `true`.

```js
function isWordAlphabetical(str) {
  str = str.toLowerCase().replace(/[^a-z]/g, "");

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] > str[i + 1]) {
      return false;
    }
  }

  return true;
}
```

**Examples:**

```js
console.log(isWordAlphabetical("abcdefg")); // true
console.log(isWordAlphabetical("hello")); // false  — h > e
console.log(isWordAlphabetical("facetiously")); // false  — f > a
console.log(isWordAlphabetical("abc")); // true
```

**Step-by-step for `"hello"`:**

| Pair  | Comparison | Result          |
| ----- | ---------- | --------------- |
| h → e | h > e      | ❌ return false |

> **Note:** The assignment comments say `"facetiously"` returns `true`, but this is incorrect — `f > a` at the very first pair. The function correctly returns `false`.

---

### 2. D Gets Jiggy

**Goal:** Take a name, remove the first letter, uppercase the rest, and return it in the format `"REST to the FIRST!"`.

**Approach:** Grab `name[0]` as the first letter, slice off the rest and call `.toUpperCase()`, then concatenate.

```js
function dGetsJiggy(name) {
  if (name.length < 2) return "";

  let firstLetter = name[0];
  let newName = name.slice(1).toUpperCase();

  return newName + " to the " + firstLetter + "!";
}
```

**Examples:**

```js
console.log(dGetsJiggy("Dylan")); // "YLAN to the D!"
console.log(dGetsJiggy("Mike")); // "IKE to the M!"
console.log(dGetsJiggy("A")); // ""  — needs at least 2 characters
```

**How it works for `"Dylan"`:**

| Step             | Value              |
| ---------------- | ------------------ |
| `firstLetter`    | `"D"`              |
| `name.slice(1)`  | `"ylan"`           |
| `.toUpperCase()` | `"YLAN"`           |
| Result           | `"YLAN to the D!"` |

---

### 3. Common Suffix

**Goal:** Given an array of words, find the longest suffix shared by all of them.

**Approach:** Start with the entire first word as the candidate suffix. For each subsequent word, trim characters off the **front** of the suffix until the word ends with it. If the suffix empties out, there is no common suffix.

```js
function commonSuffix(words) {
  if (words.length === 0) return "";

  let suffix = words[0];

  for (let i = 1; i < words.length; i++) {
    while (words[i].indexOf(suffix) !== words[i].length - suffix.length) {
      suffix = suffix.slice(1);
      if (suffix.length === 0) return "";
    }
  }

  return suffix;
}
```

**Examples:**

```js
console.log(
  commonSuffix(["deforestation", "citation", "conviction", "incarceration"]),
); // "tion"
console.log(commonSuffix(["nice", "ice", "baby"])); // ""
console.log(commonSuffix(["running", "jumping", "swimming"])); // "ing"
```

**Step-by-step for `["citation", "conviction"]`:**

| Iteration | Suffix candidate | `"conviction"` ends with it? | Action             |
| --------- | ---------------- | ---------------------------- | ------------------ |
| start     | `"citation"`     | No                           | trim → `"itation"` |
|           | `"itation"`      | No                           | trim → `"tation"`  |
|           | `"tation"`       | No                           | trim → `"ation"`   |
|           | `"ation"`        | No                           | trim → `"tion"`    |
|           | `"tion"`         | Yes ✅                       | keep               |

---

### 4. Book Index

**Goal:** Convert a sorted array of page numbers into a compact index string. Consecutive pages are collapsed into ranges (`13-15`), lone pages appear as-is (`1`).

**Approach:** Walk through the array, using an inner `while` loop to advance `i` as long as the next page is exactly one more than the current. When the streak ends, compare `start` and `end` to decide whether to output a range or a single number. Trim the trailing `", "` at the end.

```js
function bookIndex(pages) {
  let index = "";

  for (let i = 0; i < pages.length; i++) {
    let start = pages[i];

    while (i < pages.length - 1 && pages[i] + 1 === pages[i + 1]) {
      i++;
    }

    let end = pages[i];

    if (start === end) {
      index += start + ", ";
    } else {
      index += start + "-" + end + ", ";
    }
  }

  return index.slice(0, -2);
}
```

**Examples:**

```js
console.log(bookIndex([1, 13, 14, 15, 37, 38, 70])); // "1, 13-15, 37-38, 70"
console.log(bookIndex([1, 2, 3, 4, 5])); // "1-5"
console.log(bookIndex([5, 10, 11, 20])); // "5, 10-11, 20"
```

**Step-by-step for `[1, 13, 14, 15, 37, 38, 70]`:**

| start | end | Output                  |
| ----- | --- | ----------------------- |
| 1     | 1   | `"1"`                   |
| 13    | 15  | `"13-15"`               |
| 37    | 38  | `"37-38"`               |
| 70    | 70  | `"70"`                  |
| →     | →   | `"1, 13-15, 37-38, 70"` |

---

### 5. Drop the Mike

**Goal:** Trim whitespace and title-case the string. But if the string contains `"mike"` (case-insensitive), return `"stunned silence"` instead.

**Approach:** `.trim()` removes leading/trailing spaces. `.toLowerCase().includes("mike")` catches any case variation. The regex `/\b\w/g` matches the first character of each word (`\b` = word boundary, `\w` = word character), replacing it with its uppercase version.

```js
function dropTheMike(str) {
  str = str.trim();

  if (str.toLowerCase().includes("mike")) {
    return "stunned silence";
  }

  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
```

**Examples:**

```js
console.log(dropTheMike(" hello world ")); // "Hello World"
console.log(dropTheMike(" Hey Mike ")); // "stunned silence"
console.log(dropTheMike("  foo bar baz ")); // "Foo Bar Baz"
```

**Regex breakdown — `/\b\w/g`:**

| Part | Meaning                                               |
| ---- | ----------------------------------------------------- |
| `\b` | Word boundary (start of a word)                       |
| `\w` | Any word character (a–z, A–Z, 0–9, \_)                |
| `g`  | Global flag — replace all matches, not just the first |

---

## Concepts Used

| Concept                                | Where Applied                       |
| -------------------------------------- | ----------------------------------- |
| Character comparison (`>`)             | Is Word Alphabetical                |
| `.replace(/[^a-z]/g, '')` regex        | Is Word Alphabetical, Drop the Mike |
| `.slice(start)`                        | D Gets Jiggy, Common Suffix         |
| `.toUpperCase()`                       | D Gets Jiggy                        |
| `.indexOf()` for suffix check          | Common Suffix                       |
| Nested `while` inside `for`            | Book Index                          |
| `.slice(0, -2)` to trim trailing chars | Book Index                          |
| `.trim()`                              | Drop the Mike                       |
| `.includes()`                          | Drop the Mike                       |
| `/\b\w/g` with arrow function          | Drop the Mike                       |

---
