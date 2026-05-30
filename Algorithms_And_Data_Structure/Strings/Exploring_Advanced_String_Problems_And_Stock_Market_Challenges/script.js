// Strings To Do 11: Advanced String Problems and Stock Market Challenges


// ─────────────────────────────────────────
// 1. Is Permutation
// ─────────────────────────────────────────
// Sort both strings and compare. If they match, same characters = permutation.

function isPermutation(str1, str2) {
    if (str1.length !== str2.length) return false;
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// Bonus: ignore capitalization
function isPermutationBonus(str1, str2) {
    return isPermutation(str1.toLowerCase(), str2.toLowerCase());
}

console.log(isPermutation('mister', 'stimer')); // true
console.log(isPermutation('mister', 'sister')); // false
console.log(isPermutationBonus('Mister', 'stimer')); // true


// ─────────────────────────────────────────
// 2. All Permutations
// ─────────────────────────────────────────
// Pick each character as the first letter, then recursively
// permute the remaining characters and attach them.

function allPermutations(str) {
    if (str.length <= 1) return [str];

    let results = [];

    for (let i = 0; i < str.length; i++) {
        let rest = str.slice(0, i) + str.slice(i + 1);
        let perms = allPermutations(rest);
        for (let j = 0; j < perms.length; j++) {
            results.push(str[i] + perms[j]);
        }
    }

    return results;
}

let perms = allPermutations('team');
console.log(perms.length); // 24
console.log(perms.slice(0, 4)); // ["team", "tema", "taem", "tame"]


// ─────────────────────────────────────────
// 3. Is Pangram
// ─────────────────────────────────────────
// Check that every letter a-z appears at least once.

function isPangram(str) {
    str = str.toLowerCase();
    for (let c = 97; c <= 122; c++) {
        if (str.indexOf(String.fromCharCode(c)) === -1) return false;
    }
    return true;
}

console.log(isPangram('How quickly daft jumping zebras vex!')); // true
console.log(isPangram('abcdef ghijkl mno pqrs tuv wxy, not so fast!')); // false


// ─────────────────────────────────────────
// 4. Is Perfect Pangram
// ─────────────────────────────────────────
// Every letter must appear exactly once (after removing non-letters).

function isPerfectPangram(str) {
    let letters = str.toLowerCase().replace(/[^a-z]/g, '');
    if (letters.length !== 26) return false;
    return isPangram(letters);
}

console.log(isPerfectPangram('Mr. Jock, TV quiz PhD, bags few lynx.')); // true
console.log(isPerfectPangram('Playing jazz vibe chords quickly excites my wife.')); // false


// ─────────────────────────────────────────
// 5. Best Single Buy and Sell
// ─────────────────────────────────────────
// Track the lowest price seen so far. At each step, check
// if selling today would beat the current best profit.

function bestSingleBuySell(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        let profit = prices[i] - minPrice;
        if (profit > maxProfit) maxProfit = profit;
        if (prices[i] < minPrice) minPrice = prices[i];
    }

    return maxProfit;
}

console.log(bestSingleBuySell([6,4,6,5,9,7,6,12,2,6,11,2,4])); // 9


// ─────────────────────────────────────────
// 6. Multiple Buy and Sell
// ─────────────────────────────────────────
// Collect every upward price movement. If today is higher
// than yesterday, that difference is profit we can capture.

function multipleBuySell(prices) {
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }

    return profit;
}

console.log(multipleBuySell([6,4,6,5,9,7,6,12,2,6,11,2,4])); // 23


// ─────────────────────────────────────────
// 7. Two Transactions Max
// ─────────────────────────────────────────
// Track four states: holding after buy 1, sold after sell 1,
// holding after buy 2, sold after sell 2.

function maxProfitTwoTransactions(prices) {
    let hold1 = -prices[0], sold1 = 0;
    let hold2 = -prices[0], sold2 = 0;

    for (let i = 1; i < prices.length; i++) {
        hold1 = Math.max(hold1, -prices[i]);
        sold1 = Math.max(sold1, hold1 + prices[i]);
        hold2 = Math.max(hold2, sold1 - prices[i]);
        sold2 = Math.max(sold2, hold2 + prices[i]);
    }

    return sold2;
}

console.log(maxProfitTwoTransactions([6,4,6,5,9,7,6,12,2,6,11,2,4])); // 17


// ─────────────────────────────────────────
// 8. K Transactions Max
// ─────────────────────────────────────────
// Dynamic programming: dp[t][d] = best profit using t trades up to day d.
// If k is large enough, it's the same as unlimited trades.

function maxProfitKTransactions(prices, k) {
    let n = prices.length;

    if (k >= Math.floor(n / 2)) return multipleBuySell(prices);

    let dp = Array(k + 1).fill(0).map(() => Array(n).fill(0));

    for (let t = 1; t <= k; t++) {
        let maxSoFar = -prices[0];
        for (let d = 1; d < n; d++) {
            dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxSoFar);
            maxSoFar = Math.max(maxSoFar, dp[t - 1][d] - prices[d]);
        }
    }

    return dp[k][n - 1];
}

console.log(maxProfitKTransactions([6,4,6,5,9,7,6,12,2,6,11,2,4], 1));  // 9
console.log(maxProfitKTransactions([6,4,6,5,9,7,6,12,2,6,11,2,4], 2));  // 17
console.log(maxProfitKTransactions([6,4,6,5,9,7,6,12,2,6,11,2,4], 10)); // 23