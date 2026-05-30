# Strings To Do 13: String Manipulation, Encoding, and Shortening

## Overview

Three challenges about transforming strings in practical ways: compressing repeated characters, reversing that compression, and shrinking a string to a target length while keeping it as readable as possible.

---

## Challenges

### 1. String Encode

**Goal:** Compress a string by replacing runs of repeated characters with the character and how many times it appears. Only return the compressed version if it's actually shorter.

```js
function stringEncode(str) {
  if (!str) return "";

  let encoded = "";
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      encoded += str[i - 1] + count;
      count = 1;
    }
  }

  return encoded.length < str.length ? encoded : str;
}
```

**Examples:**

```js
console.log(stringEncode("aaaabbcddd")); // "a4b2c1d3"
console.log(stringEncode("bb")); // "bb"  — "b2" is the same length, not shorter
console.log(stringEncode("aaabbb")); // "a3b3" — 4 chars vs 6, so return encoded
```

**How `"aaaabbcddd"` is encoded:**

| Run        | Character | Count | Adds                           |
| ---------- | --------- | ----- | ------------------------------ |
| `aaaa`     | a         | 4     | `a4`                           |
| `bb`       | b         | 2     | `b2`                           |
| `c`        | c         | 1     | `c1`                           |
| `ddd`      | d         | 3     | `d3`                           |
| **Result** |           |       | `"a4b2c1d3"` (8 chars vs 10) ✓ |

The loop runs one step past the end (`i <= str.length`) so the last group gets flushed. When `str[i]` is `undefined`, it's always different from the previous character, triggering the write.

---

### 2. String Decode

**Goal:** Reverse the encoding — take pairs of `[char][number]` and expand each one.

```js
function stringDecode(str) {
  let decoded = "";

  for (let i = 0; i < str.length; i += 2) {
    let char = str[i];
    let count = parseInt(str[i + 1]);
    decoded += char.repeat(count);
  }

  return decoded;
}
```

**Examples:**

```js
console.log(stringDecode("a4b2c1d3")); // "aaaabbcddd"
console.log(stringDecode("a3b3")); // "aaabbb"
```

**Step by step for `"a4b2c1d3"`:**

| i   | char | count | Adds     |
| --- | ---- | ----- | -------- |
| 0   | `a`  | 4     | `"aaaa"` |
| 2   | `b`  | 2     | `"bb"`   |
| 4   | `c`  | 1     | `"c"`    |
| 6   | `d`  | 3     | `"ddd"`  |

The loop jumps by 2 each time because every encoded entry is exactly 2 characters: one letter, one digit.

> `stringDecode(stringEncode(str))` always gives back the original string.

---

### 3. Shortener

**Goal:** Shrink a string to a target length, removing characters in a specific priority order so the result stays as readable as possible.

```js
function shortener(str, length) { ... }
```

**The order of removal (from least to most important):**

| Step | What gets removed                                                 | Example                                |
| ---- | ----------------------------------------------------------------- | -------------------------------------- |
| 1    | Trim whitespace, capitalize words, then remove spaces (from back) | `"wonderful life"` → `"WonderfulLife"` |
| 2    | Punctuation from the back                                         | `"Beth!"` → `"Beth"`                   |
| 3    | Lowercase vowels from the back                                    | `"life"` → `"lf"`                      |
| 4    | Lowercase consonants from the back                                | `"lf"` → `"L"` (after earlier caps)    |
| 5    | Uppercase letters from the back                                   | last resort                            |

**All 5 lengths demonstrated on `"It's a wonderful life, Beth!"`:**

```js
let base = "It's a wonderful life, Beth! ";

console.log(shortener(base, 26)); // "It's A WonderfulLife,Beth!"
console.log(shortener(base, 22)); // "It'sAWonderfulLifeBeth"
console.log(shortener(base, 17)); // "ItsAWonderflLfBth"
console.log(shortener(base, 12)); // "ItsAWndrflLB"
console.log(shortener(base, 3)); // "IAW"
```

**Tracing the transformation:**

```
Original:         "It's a wonderful life, Beth!"  (28 chars)

After trim:       "It's a wonderful life, Beth!"
After capitalize: "It's A Wonderful Life, Beth!"
After rm spaces:  "It's A WonderfulLife,Beth!"    → length 26 ✓

Remove punct:     "It'sAWonderfulLifeBeth"        → length 22 ✓

Remove vowels:    "ItsAWonderflLfBth"             → length 17 ✓
(e, u, i, e removed from back)

Remove consonants: "ItsAWndrflLB"                → length 12 ✓

Remove uppercase:  "IAW"                          → length 3  ✓
```

**Why remove from the back?** Characters at the start carry more meaning (the beginning of a sentence). Trimming from the back preserves the most important context.

---

## Encode ↔ Decode Round-Trip

```js
let original = "aaaabbcddd";
let encoded = stringEncode(original); // "a4b2c1d3"
let decoded = stringDecode(encoded); // "aaaabbcddd"

console.log(original === decoded); // true
```

This is the same idea used in real compression formats — store data in a compact form, expand it back when needed.

---

## Concepts Used

| Concept                 | Where Applied                  |
| ----------------------- | ------------------------------ |
| Run-length counting     | String Encode                  |
| `char.repeat(n)`        | String Decode                  |
| Loop step `i += 2`      | String Decode                  |
| `parseInt()`            | String Decode                  |
| `.lastIndexOf()`        | Shortener (remove from back)   |
| `/[^a-zA-Z0-9]/.test()` | Shortener (detect punctuation) |
| Priority-based removal  | Shortener                      |

---
