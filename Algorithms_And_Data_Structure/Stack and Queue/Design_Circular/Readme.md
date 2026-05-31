# LeetCode — Design Circular Queue

## Problem

Design a circular queue — a fixed-size queue where the end wraps back around to the front. Implement six operations: `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.

🔗 https://leetcode.com/problems/design-circular-queue/

---

## The Solution

```js
var MyCircularQueue = function (k) {
  this.queue = new Array(k);
  this.capacity = k;
  this.head = 0;
  this.tail = 0;
  this.size = 0;
};

MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false;
  this.queue[this.tail] = value;
  this.tail = (this.tail + 1) % this.capacity;
  this.size++;
  return true;
};

MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.capacity;
  this.size--;
  return true;
};

MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.head];
};

MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;
  return this.queue[(this.tail - 1 + this.capacity) % this.capacity];
};

MyCircularQueue.prototype.isEmpty = function () {
  return this.size === 0;
};

MyCircularQueue.prototype.isFull = function () {
  return this.size === this.capacity;
};
```

---

## Case 1 — Step by Step

```js
var obj = new MyCircularQueue(3); // capacity = 3

obj.enQueue(1); // true  — queue: [1, _, _]
obj.enQueue(2); // true  — queue: [1, 2, _]
obj.enQueue(3); // true  — queue: [1, 2, 3]
obj.enQueue(4); // false — queue is full
obj.Rear(); // 3     — last item
obj.isFull(); // true
obj.deQueue(); // true  — removes 1, queue: [_, 2, 3]
obj.enQueue(4); // true  — queue: [4, 2, 3] (wraps around!)
obj.Rear(); // 4
```

---

## What is a Circular Queue?

A regular queue removes from the front and adds to the back. The problem is that once you dequeue enough items, the front of the array fills with empty gaps — wasted space.

A **circular queue** fixes this by wrapping the tail back to the beginning when it reaches the end:

```
capacity = 3

After enQueue(1), enQueue(2), enQueue(3):
  index:  [0]  [1]  [2]
  data:   [ 1]  [ 2]  [ 3]
           ↑ head        ↑ tail (wraps to 0 next)

After deQueue() — removes index 0:
  index:  [0]  [1]  [2]
  data:   [ _]  [ 2]  [ 3]
                ↑ head   ↑ tail (at 0 now)

After enQueue(4) — tail is at 0, wraps around:
  index:  [0]  [1]  [2]
  data:   [ 4]  [ 2]  [ 3]
   ↑ tail       ↑ head
```

The slot that was freed at index 0 is immediately reused. No wasted space.

---

## The Four Key Variables

| Variable   | What it tracks                        |
| ---------- | ------------------------------------- |
| `queue`    | The fixed-size array storing values   |
| `capacity` | Max number of elements                |
| `head`     | Index of the oldest item (front)      |
| `tail`     | Index where the next item goes (back) |
| `size`     | Current number of items               |

---

## The Wrap-Around Formula

The magic that makes it circular is the modulo operator:

```js
this.tail = (this.tail + 1) % this.capacity;
this.head = (this.head + 1) % this.capacity;
```

When `tail` reaches the end of the array, `% capacity` sends it back to index `0`.

```
tail = 2, capacity = 3
(2 + 1) % 3 = 0  ← wraps back to the start
```

For `Rear()`, we need the index just before `tail`:

```js
(this.tail - 1 + this.capacity) % this.capacity;
```

The `+ this.capacity` prevents a negative result when `tail` is `0`:

```
tail = 0, capacity = 3
(0 - 1 + 3) % 3 = 2  ← correct last index
```

---

## Why Track `size` Separately?

Without `size`, it's hard to tell if the queue is empty or full — both cases can have `head === tail`. Tracking `size` directly makes `isEmpty` and `isFull` simple one-liners and removes all ambiguity.

---

## Complexity

|       | Value                        |
| ----- | ---------------------------- |
| Time  | O(1) for all operations      |
| Space | O(k) — fixed array of size k |

---
