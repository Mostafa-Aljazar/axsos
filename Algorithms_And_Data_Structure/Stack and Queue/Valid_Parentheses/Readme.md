# LeetCode — Valid Parentheses

## Problem

Given a string of brackets, return `true` if every opening bracket is properly closed in the correct order. Return `false` otherwise.

Valid brackets: `()`, `{}`, `[]`

🔗 https://leetcode.com/problems/valid-parentheses/

---

## The Solution

```js
var isValid = function (s) {
  let stack = [];
  let map = { ")": "(", "}": "{", "]": "[" };

  for (let char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
};
```

---

## All 5 Cases

```js
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([])")); // true
console.log(isValid("([)]")); // false
```

---

## How It Works

The core tool here is a **stack** — a list where you can only add or remove from the top (last in, first out, like a stack of plates).

**The rule:** When you see an opening bracket, push it onto the stack. When you see a closing bracket, the top of the stack must be its matching opener — if not, the string is invalid.

---

## Walking Through Each Case

### Case 1 — `"()"` → `true`

```
char '('  → push     stack: ['(']
char ')'  → pop '('  matches map[')'] = '(' ✓   stack: []
End: stack empty → true
```

---

### Case 2 — `"()[]{}"` → `true`

```
char '('  → push     stack: ['(']
char ')'  → pop '('  matches '(' ✓    stack: []
char '['  → push     stack: ['[']
char ']'  → pop '['  matches '[' ✓    stack: []
char '{'  → push     stack: ['{']
char '}'  → pop '{'  matches '{' ✓    stack: []
End: stack empty → true
```

---

### Case 3 — `"(]"` → `false`

```
char '('  → push     stack: ['(']
char ']'  → pop '('  map[']'] = '[', but got '(' ✗ → false
```

---

### Case 4 — `"([])"` → `true`

```
char '('  → push     stack: ['(']
char '['  → push     stack: ['(', '[']
char ']'  → pop '['  matches '[' ✓    stack: ['(']
char ')'  → pop '('  matches '(' ✓    stack: []
End: stack empty → true
```

---

### Case 5 — `"([)]"` → `false`

```
char '('  → push     stack: ['(']
char '['  → push     stack: ['(', '[']
char ')'  → pop '['  map[')'] = '(', but got '[' ✗ → false
```

This is the tricky one — the brackets overlap instead of nest properly.

---

## Why a Stack?

Brackets must close in the **reverse order** they were opened. The last bracket opened must be the first one closed. That's exactly what a stack gives you — the most recently added item is always on top.

```
Valid nesting:    ( [ ] )    ← [ opens and closes before ) closes (
Invalid overlap:  ( [ ) ]    ← ) tries to close before [ closes
```

---

## The Lookup Map

```js
let map = { ")": "(", "}": "{", "]": "[" };
```

This maps every closing bracket to its matching opener. Instead of a chain of `if/else`, we just look up what the closer expects and compare it to what we popped off the stack.

---

## Edge Cases

| Input    | Output  | Why                               |
| -------- | ------- | --------------------------------- |
| `""`     | `true`  | Empty string — stack stays empty  |
| `"("`    | `false` | Stack has `(` left at the end     |
| `")"`    | `false` | Stack is empty when we try to pop |
| `"{[]}"` | `true`  | Properly nested                   |

The `stack.pop()` call on an empty stack returns `undefined`, which will never equal `map[char]`, so unclosed openers are caught automatically at the end with `stack.length === 0`.

---

## Complexity

|       | Value                                  |
| ----- | -------------------------------------- |
| Time  | O(n) — one pass through the string     |
| Space | O(n) — stack holds at most n/2 openers |

---
