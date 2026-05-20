class Solution(object):
    def areOccurrencesEqual(self, s):
        freq = {}

        for char in s:
            freq[char] = freq.get(char, 0) + 1

        values = list(freq.values())

        return len(set(values)) == 1

# Example:
solution = Solution()
print(solution.areOccurrencesEqual("aa"))  

print(solution.areOccurrencesEqual("aba"))

print(solution.areOccurrencesEqual("aabbcc"))
