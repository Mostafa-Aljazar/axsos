// Strings To Do 10: Exploring Advanced String Manipulation


// ─────────────────────────────────────────
// 1. Dedupe
// ─────────────────────────────────────────
// Keep only the LAST occurrence of each character.
// Walk backwards, skip any character we've already seen.

function dedupe(str) {
    let seen = {};
    let result = '';

    for (let i = str.length - 1; i >= 0; i--) {
        if (!seen[str[i]]) {
            seen[str[i]] = true;
            result = str[i] + result;
        }
    }

    return result;
}

console.log(dedupe("Snaps! crackles! pops!"));
// "Snrackle ops!"


// ─────────────────────────────────────────
// 2. Index of First Unique Letter
// ─────────────────────────────────────────
// Count how many times each character appears.
// Then find the first one with a count of exactly 1.

function firstUniqueLetterIndex(str) {
    let count = {};

    for (let i = 0; i < str.length; i++) {
        count[str[i]] = (count[str[i]] || 0) + 1;
    }

    for (let i = 0; i < str.length; i++) {
        if (count[str[i]] === 1) return i;
    }

    return -1;
}

console.log(firstUniqueLetterIndex("empathetic monarch meets primo stinker"));
// 35  (the character 'k')


// ─────────────────────────────────────────
// 3. Unique Letters
// ─────────────────────────────────────────
// Return only the characters that appear exactly once.
// Case-sensitive: 'P' and 'p' are different characters.

function uniqueLetters(str) {
    let count = {};

    for (let i = 0; i < str.length; i++) {
        count[str[i]] = (count[str[i]] || 0) + 1;
    }

    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (count[str[i]] === 1) result += str[i];
    }

    return result;
}

console.log(uniqueLetters("Snap! Crackle! Poop!"));
// "SnCrckleP"


// ─────────────────────────────────────────
// 4. Num to String
// ─────────────────────────────────────────
// Convert a number to a string without using .toString().
// Extract digits one by one using % 10 and Math.floor.

function numToString(num) {
    let digits = '0123456789';

    if (num < 0) return '-' + numToString(-num);

    let intPart = Math.floor(Math.abs(num));
    let result = '';

    if (intPart === 0) {
        result = '0';
    } else {
        let temp = intPart;
        while (temp > 0) {
            result = digits[temp % 10] + result;
            temp = Math.floor(temp / 10);
        }
    }

    // Handle decimal digits
    let strNum = '' + num;
    let dotIndex = strNum.indexOf('.');
    if (dotIndex !== -1) {
        result += '.' + strNum.slice(dotIndex + 1);
    }

    return result;
}

console.log(numToString(1234));    // "1234"
console.log(numToString(11.2051)); // "11.2051"
console.log(numToString(0));       // "0"


// ─────────────────────────────────────────
// 5. Num to Text
// ─────────────────────────────────────────
// Convert a number into English words.
// Break the number into billions, millions, thousands, and remainder.
// Handle decimals digit by digit.

function numToText(num) {
    let ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
                'seventeen','eighteen','nineteen'];
    let tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    function underThousand(n) {
        if (n === 0) return '';
        if (n < 20) return ones[n];
        if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
        }
        let rest = n % 100 !== 0 ? ' ' + underThousand(n % 100) : '';
        return ones[Math.floor(n / 100)] + ' hundred' + rest;
    }

    let strNum = '' + num;
    let dotIndex = strNum.indexOf('.');
    let intPart = dotIndex !== -1 ? parseInt(strNum.slice(0, dotIndex)) : num;
    let decPart = dotIndex !== -1 ? strNum.slice(dotIndex + 1) : null;

    let result = '';

    if (intPart === 0) {
        result = 'zero';
    } else {
        let parts = [];
        let billions  = Math.floor(intPart / 1000000000);
        let millions  = Math.floor((intPart % 1000000000) / 1000000);
        let thousands = Math.floor((intPart % 1000000) / 1000);
        let remainder = intPart % 1000;

        if (billions)  parts.push(underThousand(billions)  + ' billion');
        if (millions)  parts.push(underThousand(millions)  + ' million');
        if (thousands) parts.push(underThousand(thousands) + ' thousand');
        if (remainder) parts.push(underThousand(remainder));

        result = parts.join(' ');
    }

    if (decPart) {
        let decWords = decPart.split('').map(d => ones[parseInt(d)]);
        result += ' point ' + decWords.join(' ');
    }

    return result;
}

console.log(numToText(40213));   // "forty thousand two hundred thirteen"
console.log(numToText(11.2051)); // "eleven point two zero five one"
console.log(numToText(1000000)); // "one million"
console.log(numToText(0));       // "zero"