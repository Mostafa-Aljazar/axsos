class MyHashMap:

    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]

    def _bucket(self, key):
        return key % self.size

    def put(self, key, value):
        bucket = self.buckets[self._bucket(key)]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        bucket = self.buckets[self._bucket(key)]
        for k, v in bucket:
            if k == key:
                return v
        return -1

    def remove(self, key):
        bucket = self.buckets[self._bucket(key)]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return


# Case 1
obj = MyHashMap()
obj.put(1, 1)
obj.put(2, 2)
print(obj.get(1))   # 1
print(obj.get(3))   # -1
obj.put(2, 1)
print(obj.get(2))   # 1
obj.remove(2)
print(obj.get(2))   # -1