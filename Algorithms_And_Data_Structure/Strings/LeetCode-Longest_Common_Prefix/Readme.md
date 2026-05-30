# LeetCode — Longest Common Prefix

## Problem

Given an array of strings, find the longest prefix that is shared by **all** of them. If there is no common prefix, return an empty string `""`.

🔗 https://leetcode.com/problems/longest-common-prefix/

---

## Examples

| Input                                 | Output    | Why                                 |
| ------------------------------------- | --------- | ----------------------------------- |
| `["flower","flow","flight"]`          | `"fl"`    | All three start with `"fl"`         |
| `["dog","racecar","car"]`             | `""`      | No shared starting characters       |
| `["interview","intercom","interest"]` | `"inter"` | All share `"inter"`                 |
| `["a"]`                               | `"a"`     | Only one word — it's its own prefix |

---

## Solution

```js
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
};
```

---

## How It Works

**Start with the first word as the candidate prefix.** Then compare it against every other word. If the current word doesn't start with the prefix, trim one character off the end and try again. Keep trimming until it fits or the prefix is empty.

**Step by step for `["flower", "flow", "flight"]`:**

```
prefix = "flower"   ← start with the first word

Compare with "flow":
  Does "flow" start with "flower"? No → trim → "flowe"
  Does "flow" start with "flowe"?  No → trim → "flow"
  Does "flow" start with "flow"?   Yes ✓

Compare with "flight":
  Does "flight" start with "flow"? No → trim → "flo"
  Does "flight" start with "flo"?  No → trim → "fl"
  Does "flight" start with "fl"?   Yes ✓

Result: "fl"
```

**Step by step for `["dog", "racecar", "car"]`:**

```
prefix = "dog"

Compare with "racecar":
  Does "racecar" start with "dog"? No → trim → "do"
  Does "racecar" start with "do"?  No → trim → "d"
  Does "racecar" start with "d"?   No → trim → ""
  prefix is empty → return ""
```

---

## Why `indexOf(prefix) !== 0`?

`"flow".indexOf("flower")` returns `-1` (not found).
`"flow".indexOf("flow")` returns `0` (found at the start).

So checking `!== 0` means: _"does this word NOT start with the prefix?"_ — if true, we trim.

---

## Complexity

|       | Value | Explanation                             |
| ----- | ----- | --------------------------------------- |
| Time  | O(S)  | S = total characters across all strings |
| Space | O(1)  | Only storing the prefix string          |

---
