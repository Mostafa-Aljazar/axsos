/**
 * LeetCode: Longest Common Prefix
 * https://leetcode.com/problems/longest-common-prefix/
 *
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return '';

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === '') return '';
        }
    }

    return prefix;
};


// Case 1
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
// Output: "fl"

// Case 2
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
// Output: ""

// Extra tests
console.log(longestCommonPrefix(["interview", "intercom", "interest"])); // "inter"
console.log(longestCommonPrefix(["a"]));                                  // "a"
console.log(longestCommonPrefix(["ab", "a"]));                            // "a"