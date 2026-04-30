class Node:
    def __init__(self, val):
        self.value = val
        self.next = None
        self.prev = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    # add to end
    def add_to_end(self, val):
        new_node = Node(val)

        if self.head is None:
            self.head = new_node
            self.tail = new_node
            return self

        self.tail.next = new_node
        new_node.prev = self.tail
        self.tail = new_node
        return self

    # print list
    def print_values(self):
        runner = self.head
        while runner is not None:
            print(runner.value)
            runner = runner.next
        return self

    # delete first match
    def delete(self, val):
        if self.head is None:
            return self

        runner = self.head

        while runner is not None:
            if runner.value == val:

                if runner == self.head:
                    self.head = runner.next
                    if self.head:
                        self.head.prev = None

                elif runner == self.tail:
                    self.tail = runner.prev
                    self.tail.next = None

                else:
                    runner.prev.next = runner.next
                    runner.next.prev = runner.prev

                return self

            runner = runner.next

        return self

    # insert before a value
    def insert_before(self, target, val):
        if self.head is None:
            return self

        new_node = Node(val)

        runner = self.head

        while runner is not None:
            if runner.value == target:

                if runner == self.head:
                    new_node.next = self.head
                    self.head.prev = new_node
                    self.head = new_node
                    return self

                prev_node = runner.prev

                prev_node.next = new_node
                new_node.prev = prev_node

                new_node.next = runner
                runner.prev = new_node

                return self

            runner = runner.next

        return self

    # insert at index
    def insert_at(self, index, val):
        if index == 0:
            new_node = Node(val)

            if self.head is None:
                self.head = self.tail = new_node
                return self

            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
            return self

        runner = self.head
        i = 0

        while runner is not None and i < index:
            runner = runner.next
            i += 1

        if runner is None:
            return self.add_to_end(val)

        return self.insert_before(runner.value, val)

    # get middle (two pointers)
    def get_middle(self):
        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow.value if slow else None

    # detect cycle
    def has_cycle(self):
        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False

    # reverse list
    def reverse(self):
        current = self.head
        temp = None

        self.tail = self.head

        while current is not None:
            temp = current.prev
            current.prev = current.next
            current.next = temp
            current = current.prev

        if temp is not None:
            self.head = temp.prev

        return self

    # remove duplicates (O(n^2))
    def remove_duplicates(self):
        outer = self.head

        while outer is not None:
            inner = outer.next

            while inner is not None:
                if inner.value == outer.value:
                    nxt = inner.next

                    if inner == self.tail:
                        self.tail = inner.prev
                        self.tail.next = None
                    else:
                        inner.prev.next = inner.next
                        inner.next.prev = inner.prev

                    inner = nxt
                else:
                    inner = inner.next

            outer = outer.next

        return self


# These are the tests for your code

dll = DoublyLinkedList()

dll.add_to_end(1)
dll.add_to_end(2)
dll.add_to_end(3)
dll.add_to_end(2)
dll.add_to_end(4)

dll.print_values()

print("middle:", dll.get_middle())

dll.remove_duplicates()
dll.print_values()

dll.reverse()
dll.print_values()