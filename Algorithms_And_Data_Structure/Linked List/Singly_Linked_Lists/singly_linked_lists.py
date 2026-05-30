# Singly Linked Lists


class SLNode:
    def __init__(self, val):
        self.value = val
        self.next = None


class SList:
    def __init__(self):
        self.head = None

    # ── Add a node to the front ──────────────────────────────────────
    def add_to_front(self, val):
        new_node = SLNode(val)
        new_node.next = self.head
        self.head = new_node
        return self

    # ── Add a node to the back ───────────────────────────────────────
    def add_to_back(self, val):
        if self.head is None:
            return self.add_to_front(val)
        new_node = SLNode(val)
        runner = self.head
        while runner.next is not None:
            runner = runner.next
        runner.next = new_node
        return self

    # ── Print every value ────────────────────────────────────────────
    def print_values(self):
        runner = self.head
        while runner is not None:
            print(runner.value)
            runner = runner.next
        return self

    # ── Remove the first node and return its value ───────────────────
    def remove_from_front(self):
        if self.head is None:
            return None
        val = self.head.value
        self.head = self.head.next
        return val

    # ── Remove the last node and return its value ────────────────────
    def remove_from_back(self):
        if self.head is None:
            return None
        if self.head.next is None:
            val = self.head.value
            self.head = None
            return val
        runner = self.head
        while runner.next.next is not None:
            runner = runner.next
        val = runner.next.value
        runner.next = None
        return val

    # ── Remove the first node that has the given value ───────────────
    def remove_val(self, val):
        if self.head is None:
            return self
        if self.head.value == val:
            self.head = self.head.next
            return self
        runner = self.head
        while runner.next is not None:
            if runner.next.value == val:
                runner.next = runner.next.next
                return self
            runner = runner.next
        return self

    # ── Insert a node with val as the nth node (0-indexed) ───────────
    def insert_at(self, val, n):
        if n == 0:
            return self.add_to_front(val)
        runner = self.head
        for i in range(n - 1):
            if runner is None:
                return self
            runner = runner.next
        if runner is None:
            return self
        new_node = SLNode(val)
        new_node.next = runner.next
        runner.next = new_node
        return self


# ── Tests ────────────────────────────────────────────────────────────

print("--- Basic chaining ---")
my_list = SList()
my_list.add_to_front("are").add_to_front("Linked lists").add_to_back("fun!").print_values()
# Linked lists
# are
# fun!

print("\n--- remove_from_front ---")
l = SList()
l.add_to_back(1).add_to_back(2).add_to_back(3)
print(l.remove_from_front())  # 1
l.print_values()               # 2, 3

print("\n--- remove_from_back ---")
l2 = SList()
l2.add_to_back(1).add_to_back(2).add_to_back(3)
print(l2.remove_from_back())  # 3
l2.print_values()              # 1, 2

print("\n--- remove_val ---")
l3 = SList()
l3.add_to_back(1).add_to_back(2).add_to_back(3).add_to_back(4)
l3.remove_val(2).print_values()  # 1, 3, 4

print("\n--- insert_at ---")
l4 = SList()
l4.add_to_back(1).add_to_back(2).add_to_back(4)
l4.insert_at(3, 2).print_values()  # 1, 2, 3, 4