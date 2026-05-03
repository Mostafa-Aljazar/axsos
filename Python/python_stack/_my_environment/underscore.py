class Underscore:
    def map(self, iterable, callback):
        result = []
        for item in iterable:
            result.append(callback(item))
        return result

    def find(self, iterable, callback):
        for item in iterable:
            if callback(item):
                return item
        return None

    def filter(self, iterable, callback):
        result = []
        for item in iterable:
            if callback(item):
                result.append(item)
        return result

    def reject(self, iterable, callback):
        result = []
        for item in iterable:
            if not callback(item):
                result.append(item)
        return result

# Example usage:
_ = Underscore()

print(_.map([1, 2, 3], lambda x: x * 2))  
# [2, 4, 6]

print(_.find([1, 2, 3, 4, 5, 6], lambda x: x > 4))  
# 5

print(_.filter([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0))  
# [2, 4, 6]

print(_.reject([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0))  
# [1, 3, 5]