// 1. Always Hungry
function alwaysHungry(arr) {
    let found = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "food") {
            console.log("yummy");
            found = true;
        }
    }

    if (!found) {
        console.log("I'm hungry");
    }
}

// test
console.log("🚀 ~ alwaysHungry ------------------------")

alwaysHungry([3.14, "food", "pie", true, "food"]);
alwaysHungry([4, 1, 5, 7, 2]);


// 2. High Pass Filter
function highPass(arr, cutoff) {
    let filteredArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > cutoff) {
            filteredArr.push(arr[i]);
        }
    }

    return filteredArr;
}

// test
console.log("🚀 ~ highPass ------------------------")
let result1 = highPass([6, 8, 3, 10, -2, 5, 9], 5);
console.log(result1);


// 3. Better than Average
function betterThanAverage(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    let avg = sum / arr.length;

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > avg) {
            count++;
        }
    }

    return count;
}

// test
console.log("🚀 ~ betterThanAverage ------------------------")
let result2 = betterThanAverage([6, 8, 3, 10, -2, 5, 9]);
console.log(result2);


// 4. Reverse Array
function reverse(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }

    return arr;
}

// test
console.log("🚀 ~ reverse ------------------------")
let result3 = reverse(["a", "b", "c", "d", "e"]);
console.log(result3);


// 5. Fibonacci Array
function fibonacciArray(n) {
    let fibArr = [0, 1];

    for (let i = 2; i < n; i++) {
        let next = fibArr[i - 1] + fibArr[i - 2];
        fibArr.push(next);
    }

    return fibArr;
}

// test
console.log("🚀 ~ fibonacciArray ------------------------")
let result4 = fibonacciArray(10);
console.log(result4);