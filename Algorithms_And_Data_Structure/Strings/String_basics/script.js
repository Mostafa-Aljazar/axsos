// 1. Remove Blanks
function removeBlanks(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      result += str[i];
    }
  }

  return result;
}

console.log("🚀 ~ removeBlanks -------------------")
console.log(removeBlanks(" Pl ayTha tF u nkyM usi c "));


// 2. Get Digits
function getDigits(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== " ") {
      result += str[i];
    }
  }

  return Number(result);
}

console.log("🚀 ~ getDigits -------------------")
console.log(getDigits("abc8c0d1ngd0j0!8"));

// 3. Acronyms
function acronym(str) {
  let result = "";

  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      let firstChar = words[i][0];

      if (firstChar >= "a" && firstChar <= "z") {
        firstChar = firstChar.toUpperCase();
      }

      result += firstChar;
    }
  }

  return result;
}

console.log("🚀 ~ acronym -------------------")
console.log(acronym(" there's no free lunch - gotta pay yer way. "));

// 4. Count Non-Spaces
function countNonSpaces(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      count++;
    }
  }

  return count;
}

console.log("🚀 ~ countNonSpaces -------------------")
console.log(countNonSpaces("Honey pie, you are driving me crazy"));


// 5. Remove Shorter Strings
function removeShorterStrings(arr, minLength) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length >= minLength) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log("🚀 ~ removeShorterStrings -------------------")
console.log(removeShorterStrings(['Good morning', 'sunshine', 'the', 'Earth', 'says', 'hello'], 4));