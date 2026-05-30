# Singly Linked Lists

## Overview

A **singly linked list** is a chain of nodes. Each node holds a value and a pointer to the next node. Unlike an array, there's no index — to find something, you start at the head and follow the chain.

```
head
 ↓
[Linked lists] → [are] → [fun!] → None
```

---

## The Two Classes

```python
class SLNode:
    def __init__(self, val):
        self.value = val
        self.next = None       # pointer to the next node (None by default)


class SList:
    def __init__(self):
        self.head = None       # the list starts empty
```

Every node knows its own value and who its neighbor is. The list only knows where it starts (the head).

---

## Methods

### `add_to_front(val)`

Creates a new node and places it at the beginning of the list.

```python
def add_to_front(self, val):
    new_node = SLNode(val)
    new_node.next = self.head   # new node points to the old head
    self.head = new_node        # new node becomes the new head
    return self
```

No shifting needed — just update two pointers. This is one reason linked lists can be faster than arrays for front insertions.

---

### `add_to_back(val)`

Walks to the last node, then attaches the new node there.

```python
def add_to_back(self, val):
    if self.head is None:
        return self.add_to_front(val)
    new_node = SLNode(val)
    runner = self.head
    while runner.next is not None:
        runner = runner.next
    runner.next = new_node
    return self
```

The `while runner.next is not None` loop stops at the last node (the one with no neighbor). Then we attach the new node there.

---

### `print_values()`

Walks through the list and prints each value.

```python
def print_values(self):
    runner = self.head
    while runner is not None:
        print(runner.value)
        runner = runner.next
    return self
```

`runner` is a pointer. We start it at the head and keep moving it to the next node until it falls off the end (`None`).

---

### `remove_from_front()`

Removes the first node and returns its value.

```python
def remove_from_front(self):
    if self.head is None:
        return None
    val = self.head.value
    self.head = self.head.next
    return val
```

Save the value, jump the head forward by one, done.

---

### `remove_from_back()`

Walks to the second-to-last node, removes its neighbor.

```python
def remove_from_back(self):
    if self.head is None:
        return None
    if self.head.next is None:
        val = self.head.value
        self.head = None
        return val
    runner = self.head
    while runner.next.next is not None:
        runner = runner.next
    val = runner.next.value
    runner.next = None
    return val
```

We stop one step early (`runner.next.next is None`) so `runner` is the second-to-last node. Then we set `runner.next = None` to detach the last node.

---

### `remove_val(val)`

Removes the first node that holds the given value.

```python
def remove_val(self, val):
    if self.head is None:
        return self
    if self.head.value == val:
        self.head = self.head.next
        return self
    runner = self.head
    while runner.next is not None:
        if runner.next.value == val:
            runner.next = runner.next.next
            return self
        runner = runner.next
    return self
```

Three cases handled:

- Empty list → do nothing
- Match is the head → move head forward
- Match is somewhere in the middle or end → bypass it with `runner.next = runner.next.next`

---

### `insert_at(val, n)`

Inserts a new node at position `n` (0-indexed).

```python
def insert_at(self, val, n):
    if n == 0:
        return self.add_to_front(val)
    runner = self.head
    for i in range(n - 1):
        if runner is None:
            return self
        runner = runner.next
    if runner is None:
        return self
    new_node = SLNode(val)
    new_node.next = runner.next
    runner.next = new_node
    return self
```

Walk `n-1` steps to reach the node just before the insertion point. Then slip the new node in between.

**Inserting `3` at position 2 in `[1 → 2 → 4]`:**

```
Before:  [1] → [2] → [4] → None
                ↑ stop here (position 1)

new_node.next = runner.next  →  [3] → [4]
runner.next   = new_node     →  [2] → [3]

After:   [1] → [2] → [3] → [4] → None
```

---

## Chaining

All methods return `self`, which allows you to chain calls:

```python
my_list = SList()
my_list.add_to_front("are").add_to_front("Linked lists").add_to_back("fun!").print_values()
# Linked lists
# are
# fun!
```

---

## Visualizing the Pointer Trick

The key mental model for linked lists — every operation is just redirecting arrows:

```
Add to front:
  new → [old_head → ...]    before
  new → [old_head → ...]    set new.next = old_head
  head points to new        set head = new

Remove from middle:
  ... → [A] → [B] → [C] → ...
  ... → [A] ──────→ [C] → ...    A.next = A.next.next
```

---

## Edge Cases Handled

| Situation                      | Method             | Handled by                        |
| ------------------------------ | ------------------ | --------------------------------- |
| Empty list + add_to_back       | `add_to_back`      | calls `add_to_front`              |
| Single node + remove_from_back | `remove_from_back` | special `head.next is None` check |
| Remove the head node           | `remove_val`       | checks `head.value == val` first  |
| Insert at position 0           | `insert_at`        | calls `add_to_front`              |
| Insert beyond list length      | `insert_at`        | returns `self` without crashing   |

---
