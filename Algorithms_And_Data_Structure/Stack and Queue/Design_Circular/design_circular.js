/**
 * LeetCode: Design Circular Queue
 * https://leetcode.com/problems/design-circular-queue/
 *
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this.queue    = new Array(k);
    this.capacity = k;
    this.head     = 0;
    this.tail     = 0;
    this.size     = 0;
};

MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) return false;
    this.queue[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
    return true;
};

MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return true;
};

MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) return -1;
    return this.queue[this.head];
};

MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) return -1;
    return this.queue[(this.tail - 1 + this.capacity) % this.capacity];
};

MyCircularQueue.prototype.isEmpty = function() {
    return this.size === 0;
};

MyCircularQueue.prototype.isFull = function() {
    return this.size === this.capacity;
};


// Case 1
var obj = new MyCircularQueue(3);
console.log(obj.enQueue(1)); // true
console.log(obj.enQueue(2)); // true
console.log(obj.enQueue(3)); // true
console.log(obj.enQueue(4)); // false — queue is full
console.log(obj.Rear());     // 3
console.log(obj.isFull());   // true
console.log(obj.deQueue());  // true
console.log(obj.enQueue(4)); // true
console.log(obj.Rear());     // 4