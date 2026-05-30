// Strings To Do 5: String to Array Part 1
// Two challenges using objects to return structured results.


// ─────────────────────────────────────────
// 1. Coin Change with Object
// ─────────────────────────────────────────
// Figure out the least number of coins needed for a given amount.
// We go from biggest to smallest: quarters first, then dimes,
// nickels, and finally pennies — whatever is left over.

function coinChange(cents) {
    var result = {
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
    };

    // How many quarters fit? Take those out, then move on.
    result.quarters = Math.floor(cents / 25);
    cents = cents % 25;

    // How many dimes fit in what's left?
    result.dimes = Math.floor(cents / 10);
    cents = cents % 10;

    // How many nickels fit in what's left?
    result.nickels = Math.floor(cents / 5);
    cents = cents % 5;

    // Whatever is left over is pennies
    result.pennies = cents;

    return result;
}

console.log(coinChange(87));
// { quarters: 3, dimes: 1, nickels: 0, pennies: 2 }
// 3 quarters = 75, 1 dime = 10, 2 pennies = 2  →  total: 87 ✓

console.log(coinChange(41));
// { quarters: 1, dimes: 1, nickels: 1, pennies: 1 }

console.log(coinChange(5));
// { quarters: 0, dimes: 0, nickels: 1, pennies: 0 }

console.log(coinChange(0));
// { quarters: 0, dimes: 0, nickels: 0, pennies: 0 }


// ─────────────────────────────────────────
// 2. Max / Min / Average with Object
// ─────────────────────────────────────────
// Go through the array once, tracking the biggest number,
// the smallest number, and a running total for the average.

function maxMinAverage(arr) {
    if (arr.length === 0) {
        return { max: null, min: null, average: null };
    }

    var max = arr[0];
    var min = arr[0];
    var sum = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
        sum += arr[i];
    }

    return {
        max: max,
        min: min,
        average: sum / arr.length
    };
}

console.log(maxMinAverage([3, 1, 7, 2, 9, 4]));
// { max: 9, min: 1, average: 4.333... }

console.log(maxMinAverage([10, 20, 30]));
// { max: 30, min: 10, average: 20 }

console.log(maxMinAverage([5]));
// { max: 5, min: 5, average: 5 }

console.log(maxMinAverage([]));
// { max: null, min: null, average: null }