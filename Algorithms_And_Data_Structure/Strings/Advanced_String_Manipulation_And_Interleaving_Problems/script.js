// Strings To Do 12: Interleaving and Palindrome Problems


// ─────────────────────────────────────────
// 1. Are Strings Loosely Interleaved
// ─────────────────────────────────────────
// Check if s3 is built by merging s1 and s2 in order.
// Use a DP table: dp[i][j] = can we form s3[0..i+j] using s1[0..i] and s2[0..j]?

function areStringsLooselyInterleaved(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;

    let dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(false));
    dp[0][0] = true;

    for (let i = 1; i <= s1.length; i++) dp[i][0] = dp[i-1][0] && s1[i-1] === s3[i-1];
    for (let j = 1; j <= s2.length; j++) dp[0][j] = dp[0][j-1] && s2[j-1] === s3[j-1];

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            dp[i][j] = (dp[i-1][j] && s1[i-1] === s3[i+j-1]) ||
                       (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
        }
    }

    return dp[s1.length][s2.length];
}

console.log(areStringsLooselyInterleaved("dne", "ail", "daniel")); // true
console.log(areStringsLooselyInterleaved("dne", "ail", "dalein")); // false


// ─────────────────────────────────────────
// 2. All Loosely Interleaved Strings
// ─────────────────────────────────────────
// Recursively pick the next character from either s1 or s2.
// Collect all unique results using a Set to remove duplicates.

function allLooselyInterleavedStrings(s1, s2) {
    let results = [];

    function build(rem1, rem2, current) {
        if (rem1.length === 0 && rem2.length === 0) {
            results.push(current);
            return;
        }
        if (rem1.length > 0) build(rem1.slice(1), rem2, current + rem1[0]);
        if (rem2.length > 0) build(rem1, rem2.slice(1), current + rem2[0]);
    }

    build(s1, s2, '');
    return [...new Set(results)];
}

console.log(allLooselyInterleavedStrings("ab", "yz"));
// ["abyz", "aybz", "ayzb", "yabz", "yazb", "yzab"]


// ─────────────────────────────────────────
// 3. Make Palindrome by Removing One
// ─────────────────────────────────────────
// Try removing each character one at a time and check if the result is a palindrome.
// Return the index of the first removal that works, or -1 if already a palindrome.

function makePalindromeByRemovingOne(str) {
    function isPalindrome(s) {
        let l = 0, r = s.length - 1;
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++; r--;
        }
        return true;
    }

    if (isPalindrome(str)) return -1;

    for (let i = 0; i < str.length; i++) {
        if (isPalindrome(str.slice(0, i) + str.slice(i + 1))) return i;
    }

    return -1;
}

console.log(makePalindromeByRemovingOne("bene")); // 0  — remove 'b' → "ene"
console.log(makePalindromeByRemovingOne("dude")); // 3  — remove 'e' → "dud"
console.log(makePalindromeByRemovingOne("bub"));  // -1 — already a palindrome


// ─────────────────────────────────────────
// 4. Make Palindrome by Adding One
// ─────────────────────────────────────────
// Use two pointers from both ends. At the first mismatch,
// the right-side character is what needs to be added on the left.

function makePalindromeByAddingOne(str) {
    function isPalindrome(s) {
        let l = 0, r = s.length - 1;
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++; r--;
        }
        return true;
    }

    if (isPalindrome(str)) return '';

    let l = 0, r = str.length - 1;
    while (l < r) {
        if (str[l] !== str[r]) return str[r];
        l++; r--;
    }

    return '';
}

console.log(makePalindromeByAddingOne("tutu")); // "u"
console.log(makePalindromeByAddingOne("dude")); // "e"
console.log(makePalindromeByAddingOne("dad"));  // ""