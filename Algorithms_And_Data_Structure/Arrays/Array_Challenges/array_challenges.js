// Array Challenges - My Solutions

// 1. Always Hungry
function alwaysHungry(arr) {
    var foundFood = false;
    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "food") {
            console.log("yummy");
            foundFood = true;
        }
    }
    
    if (foundFood == false) {
        console.log("I'm hungry");
    }
}

// Example 1:
alwaysHungry([3.14, "food", "pie", true, "food"]);
// It should show:
// yummy
// yummy

// Example 2:
alwaysHungry([4, 1, 5, 7, 2]);
// It should show:
// I'm hungry



// 2. High Pass Filter
function highPass(arr, cutoff) {
    var filteredArr = [];
    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > cutoff) {
            filteredArr.push(arr[i]);
        }
    }
    
    return filteredArr;
}

// Example:
var result = highPass([6, 8, 3, 10, -2, 5, 9], 5);
console.log(result); 
// Expected: [6, 8, 10, 9]



// 3. Better than average
function betterThanAverage(arr) {
    var sum = 0;
    var count = 0;
    
    // first find the sum
    for (var i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    
    var avg = sum / arr.length;
    
    // now count how many are bigger than avg
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > avg) {
            count = count + 1;
        }
    }
    
    return count;
}

// Example:
var result = betterThanAverage([6, 8, 3, 10, -2, 5, 9]);
console.log(result); 
// Expected: 4



// 4. Array Reverse
function reverse(arr) {
    var newArray = [];
    
    for (var i = arr.length - 1; i >= 0; i = i - 1) {
        newArray.push(arr[i]);
    }
    
    return newArray;
}

// Example:
var result = reverse(["a", "b", "c", "d", "e"]);
console.log(result); 
// Expected: ["e", "d", "c", "b", "a"]



// 5. Fibonacci Array
function fibonacciArray(n) {
    var fibArr = [0, 1];
    
    while (fibArr.length < n) {
        var nextNumber = fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2];
        fibArr.push(nextNumber);
    }
    
    return fibArr;
}

// Example:
var result = fibonacciArray(10);
console.log(result); 
// Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]