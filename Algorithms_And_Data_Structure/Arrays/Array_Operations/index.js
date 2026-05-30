// =====================
// 1. Accessing Elements
console.log(`
----------------------
1. Accessing Elements
----------------------
    `);
// =====================
let colors = ["red", "blue", "green", "yellow", "purple"];
// first
console.log(colors[0]);  
// last
console.log(colors[colors.length - 1]); 
// second
console.log(colors[1]); 
// update third
colors[2] = "orange";
console.log(colors);


// =====================
// 2. Traversing Array
// =====================
console.log(`
----------------------
2. Traversing Array
----------------------
    `);
let numbers1 = [10, 20, 30, 40, 50];

// forward
for (let i = 0; i < numbers1.length; i++) {
  console.log(numbers1[i]);
}

// reverse
for (let i = numbers1.length - 1; i >= 0; i--) {
  console.log(numbers1[i]);
}


// =====================
// 3. Searching
// =====================
console.log(`
----------------------
3. Searching
----------------------
    `);
let numbers2 = [5, 10, 15, 20, 25];
let target = 25;

let index = -1;

for (let i = 0; i < numbers2.length; i++) {
  if (numbers2[i] === target) {
    index = i;
    break;
  }
}

if (index !== -1) {
  console.log(`Found at position ${index}`);
} else {
  console.log("Not Found");
}


// =====================
// 4. Sorting
// =====================
console.log(`
----------------------
4. Sorting
----------------------
    `);
let scores = [50, 20, 70, 10, 40];

// ascending
scores.sort((a, b) => a - b);
console.log(scores);

// descending
scores.sort((a, b) => b - a);
console.log(scores);

let names = ["Shatha", "Sara", "Lina", "Sami", "Dalia"];
names.sort();
console.log(names);


// =====================
// 5. Inserting
// =====================
console.log(`
----------------------
5. Inserting
----------------------
    `);
let animals = ["dog", "cat", "rabbit"];

animals.push("elephant");
animals.unshift("lion");
animals.splice(2, 0, "tiger");

console.log(animals);


// =====================
// 6. Deleting
// =====================
console.log(`
----------------------
6. Deleting
----------------------
    `);
let fruits = ["apple", "banana", "cherry", "date"];

fruits.shift();
fruits.pop();

let bananaIndex = fruits.indexOf("banana");
if (bananaIndex !== -1) {
  fruits.splice(bananaIndex, 1);
}

console.log(fruits);


// =====================
// 7. Combining
// =====================
console.log(`
----------------------
7. Combining
----------------------
    `);
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

let combined = array1.concat(array2);
console.log(combined);


// =====================
// 8. Splitting
// =====================
console.log(`
----------------------
8. Splitting
----------------------
    `);
let items = ["a", "b", "c", "d", "e"];

let firstPart = items.slice(0, 3);
let secondPart = items.slice(3);

console.log(firstPart);
console.log(secondPart);


// =====================
// 9. Filtering
// =====================
let numbers3 = [1, 5, 10, 15, 20, 25, 30];

let filtered = numbers3.filter(num => num > 15);
console.log(filtered);


// =====================
// 10. Advanced
// =====================

// remove duplicates
let arr = [1, 2, 2, 3, 4, 4, 5];
let unique = [...new Set(arr)];
console.log(unique);

// rotate right
function rotateRight(arr, n) {
  n = n % arr.length;
  return arr.slice(-n).concat(arr.slice(0, -n));
}

console.log(rotateRight([1, 2, 3, 4, 5], 2));


// =====================
// Bonus
// =====================
function mergeSorted(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6]));