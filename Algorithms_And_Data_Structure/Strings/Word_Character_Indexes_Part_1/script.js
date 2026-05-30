// Strings To Do 3: Word Character Indexes — Solutions


// ─────────────────────────────────────────
// 1. Parens Valid
// ─────────────────────────────────────────
// Use a counter: increment for '(', decrement for ')'.
// If counter ever goes negative, a ')' appeared before its '('.
// If counter is not 0 at the end, some '(' were never closed.
function parensValid(str) {
    var count = 0;

    for (var i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            count++;
        } else if (str[i] === ')') {
            count--;
            if (count < 0) return false; // closing before opening
        }
    }

    return count === 0; // true only if all opens were closed
}

console.log(parensValid("Y(3(p)p(3)r)s")); // true
console.log(parensValid("N(0(p)3"));        // false
console.log(parensValid("N(0)t )0(k"));     // false


// ─────────────────────────────────────────
// 2. Braces Valid
// ─────────────────────────────────────────
// Use a stack: push every opening symbol onto the stack.
// When a closing symbol is found, check if the top of the stack
// is the matching opener. If not, the nesting is invalid.
function bracesValid(str) {
    var stack = [];
    var open  = { '(': ')', '{': '}', '[': ']' };
    var close = { ')': '(', '}': '{', ']': '[' };

    for (var i = 0; i < str.length; i++) {
        var ch = str[i];

        if (open[ch]) {
            stack.push(ch); // it's an opener — push it
        } else if (close[ch]) {
            // it's a closer — check if it matches the last opener
            if (stack.length === 0 || stack[stack.length - 1] !== close[ch]) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0; // true only if all openers were matched
}

console.log(bracesValid("W(a{t}s[o(n{c}o)m]e)h[e{r}e]!")); // true
console.log(bracesValid("D(i{a}l[t]o)n{e"));                // false
console.log(bracesValid("A(1)s[O(n]0{t)0}k"));              // false


// ─────────────────────────────────────────
// 3a. Is Palindrome — Strict
// ─────────────────────────────────────────
// Compare characters from both ends moving inward.
// Case-sensitive; spaces and punctuation matter.
function isPalindrome(str) {
    for (var i = 0; i < Math.floor(str.length / 2); i++) {
        if (str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
}

console.log(isPalindrome("a x a"));   // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("Dud"));     // false  (D ≠ d)
console.log(isPalindrome("oho!"));    // false  (o ≠ !)


// ─────────────────────────────────────────
// 3b. Is Palindrome — Lenient
// ─────────────────────────────────────────
// Strip all non-alphanumeric characters and lowercase before comparing.
function isPalindromeLenient(str) {
    var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

    for (var i = 0; i < Math.floor(cleaned.length / 2); i++) {
        if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) return false;
    }
    return true;
}

console.log(isPalindromeLenient("Able was I, ere I saw Elba")); // true


// ─────────────────────────────────────────
// 4a. Longest Palindrome — Strict
// ─────────────────────────────────────────
// Check every possible substring with a nested loop.
// Keep track of the longest palindromic one found.
function longestPalindrome(str) {
    var longest = "";

    for (var i = 0; i < str.length; i++) {
        for (var j = i + 1; j <= str.length; j++) {
            var sub = str.slice(i, j);
            if (isPalindrome(sub) && sub.length > longest.length) {
                longest = sub;
            }
        }
    }

    return longest;
}

console.log(longestPalindrome("what up, daddy-o?"));                  // "dad"
console.log(longestPalindrome("uh... not much"));                     // "..."
console.log(longestPalindrome("Yikes! my favorite racecar erupted!")); // "e racecar e"


// ─────────────────────────────────────────
// 4b. Longest Palindrome — Lenient
// ─────────────────────────────────────────
// Clean the string, find the longest palindrome in the cleaned version,
// then return the corresponding substring from the cleaned string.
function longestPalindromeLenient(str) {
    var cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    var longestCleaned = "";

    for (var i = 0; i < cleaned.length; i++) {
        for (var j = i + 1; j <= cleaned.length; j++) {
            var sub = cleaned.slice(i, j);
            if (isPalindrome(sub) && sub.length > longestCleaned.length) {
                longestCleaned = sub;
            }
        }
    }

    return longestCleaned;
}

console.log(longestPalindromeLenient("Hot puree eruption!")); // "tpureeerupt"