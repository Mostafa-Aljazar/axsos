// Strings To Do 13: String Encoding, Decoding, and Shortening


// ─────────────────────────────────────────
// 1. String Encode
// ─────────────────────────────────────────
// Count consecutive repeating characters and compress them.
// Only return the encoded version if it's actually shorter.

function stringEncode(str) {
    if (!str) return '';

    let encoded = '';
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            encoded += str[i - 1] + count;
            count = 1;
        }
    }

    return encoded.length < str.length ? encoded : str;
}

console.log(stringEncode("aaaabbcddd")); // "a4b2c1d3"
console.log(stringEncode("bb"));          // "bb"  — "b2" is same length, not shorter
console.log(stringEncode("aaabbb"));      // "a3b3" — shorter than "aaabbb"


// ─────────────────────────────────────────
// 2. String Decode
// ─────────────────────────────────────────
// Read pairs of [character][number] and expand each one back.

function stringDecode(str) {
    let decoded = '';

    for (let i = 0; i < str.length; i += 2) {
        let char  = str[i];
        let count = parseInt(str[i + 1]);
        decoded += char.repeat(count);
    }

    return decoded;
}

console.log(stringDecode("a4b2c1d3")); // "aaaabbcddd"
console.log(stringDecode("a3b3"));     // "aaabbb"


// ─────────────────────────────────────────
// 3. Shortener
// ─────────────────────────────────────────
// Reduce a string to a target length using a priority order:
//   1. Trim whitespace
//   2. Capitalize words, then remove spaces (from the back)
//   3. Remove punctuation (from the back)
//   4. Remove lowercase vowels (from the back)
//   5. Remove lowercase consonants (from the back)
//   6. Remove uppercase letters (from the back)

function shortener(str, length) {
    str = str.trim();
    if (str.length <= length) return str;

    // Step 1: Capitalize each word (except the first) then remove spaces
    let words = str.split(' ');
    str = words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join(' ');

    while (str.length > length && str.includes(' ')) {
        let idx = str.lastIndexOf(' ');
        str = str.slice(0, idx) + str.slice(idx + 1);
    }
    if (str.length <= length) return str;

    // Step 2: Remove punctuation from the back
    while (str.length > length) {
        let removed = false;
        for (let i = str.length - 1; i >= 0; i--) {
            if (/[^a-zA-Z0-9]/.test(str[i])) {
                str = str.slice(0, i) + str.slice(i + 1);
                removed = true;
                break;
            }
        }
        if (!removed) break;
    }
    if (str.length <= length) return str;

    // Step 3: Remove lowercase vowels from the back
    while (str.length > length) {
        let removed = false;
        for (let i = str.length - 1; i >= 0; i--) {
            if ('aeiou'.includes(str[i])) {
                str = str.slice(0, i) + str.slice(i + 1);
                removed = true;
                break;
            }
        }
        if (!removed) break;
    }
    if (str.length <= length) return str;

    // Step 4: Remove lowercase consonants from the back
    while (str.length > length) {
        let removed = false;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] >= 'a' && str[i] <= 'z') {
                str = str.slice(0, i) + str.slice(i + 1);
                removed = true;
                break;
            }
        }
        if (!removed) break;
    }
    if (str.length <= length) return str;

    // Step 5: Remove uppercase letters from the back
    while (str.length > length) {
        let removed = false;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] >= 'A' && str[i] <= 'Z') {
                str = str.slice(0, i) + str.slice(i + 1);
                removed = true;
                break;
            }
        }
        if (!removed) break;
    }

    return str;
}

let base = "It's a wonderful life, Beth! ";
console.log(shortener(base, 26)); // "It's A WonderfulLife,Beth!"
console.log(shortener(base, 22)); // "It'sAWonderfulLifeBeth"
console.log(shortener(base, 17)); // "ItsAWonderflLfBth"
console.log(shortener(base, 12)); // "ItsAWndrflLB"
console.log(shortener(base, 3));  // "IAW"