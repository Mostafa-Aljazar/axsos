# LeetCode — Design HashMap

## Problem

Build a HashMap from scratch without using any built-in hash table libraries. It needs to support three operations: `put`, `get`, and `remove`.

🔗 https://leetcode.com/problems/design-hashmap/

---

## The Solution

```python
class MyHashMap:

    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]

    def _bucket(self, key):
        return key % self.size

    def put(self, key, value):
        bucket = self.buckets[self._bucket(key)]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        bucket = self.buckets[self._bucket(key)]
        for k, v in bucket:
            if k == key:
                return v
        return -1

    def remove(self, key):
        bucket = self.buckets[self._bucket(key)]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return
```

---

## Case 1 — Step by Step

```python
obj = MyHashMap()
obj.put(1, 1)      # store key=1, value=1
obj.put(2, 2)      # store key=2, value=2
obj.get(1)         # → 1
obj.get(3)         # → -1  (key 3 was never added)
obj.put(2, 1)      # update key=2, value is now 1
obj.get(2)         # → 1
obj.remove(2)      # delete key=2
obj.get(2)         # → -1  (key 2 is gone now)
```

---

## How It Works

### The Big Idea — Buckets

A HashMap stores key-value pairs fast by deciding _where_ to put each pair using a simple formula called a **hash function**. Instead of searching through everything, you go straight to the right location.

We create 1000 empty lists (called **buckets**):

```python
self.buckets = [[] for _ in range(1000)]
```

To find which bucket a key belongs to:

```python
key % 1000
```

For example:

- key `1` → bucket `1`
- key `2` → bucket `2`
- key `1001` → bucket `1` ← same bucket as key `1`!

When two keys land in the same bucket, that's called a **collision**. We handle it by storing multiple pairs in the same bucket list.

---

### Visual — What the buckets look like

```
bucket[0]  →  []
bucket[1]  →  [(1, 1)]
bucket[2]  →  [(2, 2)]
bucket[3]  →  []
...
bucket[999] → []
```

After `obj.put(2, 1)` (updating key 2):

```
bucket[2]  →  [(2, 1)]   ← value updated in place
```

After `obj.remove(2)`:

```
bucket[2]  →  []          ← pair deleted
```

---

### `put(key, value)`

1. Find the right bucket using `key % 1000`
2. Search the bucket for an existing pair with this key
3. If found → update the value in place
4. If not found → append a new `(key, value)` pair

```python
def put(self, key, value):
    bucket = self.buckets[self._bucket(key)]
    for i, (k, v) in enumerate(bucket):
        if k == key:
            bucket[i] = (key, value)   # update
            return
    bucket.append((key, value))        # insert
```

---

### `get(key)`

1. Find the right bucket
2. Search for the key
3. Return its value, or `-1` if not found

```python
def get(self, key):
    bucket = self.buckets[self._bucket(key)]
    for k, v in bucket:
        if k == key:
            return v
    return -1
```

---

### `remove(key)`

1. Find the right bucket
2. Find the pair with the matching key
3. Delete it from the list

```python
def remove(self, key):
    bucket = self.buckets[self._bucket(key)]
    for i, (k, v) in enumerate(bucket):
        if k == key:
            del bucket[i]
            return
```

---

## Why 1000 Buckets?

LeetCode's constraints say keys are at most `10^6`. With 1000 buckets, most buckets will have only 1–2 pairs, keeping searches fast. You could use a smaller or larger number — 1000 is a practical middle ground.

---

## Complexity

| Operation | Time                                      |
| --------- | ----------------------------------------- |
| `put`     | O(n/k) average — n = entries, k = buckets |
| `get`     | O(n/k) average                            |
| `remove`  | O(n/k) average                            |

In practice, with 1000 buckets and reasonable input, each bucket holds only a handful of items, so all operations are nearly O(1).

---
