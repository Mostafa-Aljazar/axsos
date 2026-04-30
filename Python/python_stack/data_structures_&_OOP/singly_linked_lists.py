class SLNode:
    def __init__(self, val):
        self.value = val
        self.next = None


class SList:
    def __init__(self):
        self.head = None

    def add_to_front(self, val):
        new_node = SLNode(val)
        new_node.next = self.head
        self.head = new_node
        return self

    def print_values(self):
        runner = self.head
        while runner is not None:
            print(runner.value)
            runner = runner.next
        return self

    def add_to_back(self, val):
        if self.head is None:
            return self.add_to_front(val)

        new_node = SLNode(val)
        runner = self.head

        while runner.next is not None:
            runner = runner.next

        runner.next = new_node
        return self

    def remove_from_front(self):
        if self.head is None:
            return None

        removed_value = self.head.value
        self.head = self.head.next
        return removed_value

    def remove_from_back(self):
        if self.head is None:
            return None

        if self.head.next is None:
            removed_value = self.head.value
            self.head = None
            return removed_value

        runner = self.head
        while runner.next.next is not None:
            runner = runner.next

        removed_value = runner.next.value
        runner.next = None
        return removed_value

    def remove_val(self, val):
        if self.head is None:
            return None

        if self.head.value == val:
            return self.remove_from_front()

        runner = self.head
        while runner.next is not None:
            if runner.next.value == val:
                removed_value = runner.next.value
                runner.next = runner.next.next
                return removed_value
            runner = runner.next

        return None

    def insert_at(self, val, n):
        if n == 0:
            return self.add_to_front(val)

        new_node = SLNode(val)
        runner = self.head
        index = 0

        while runner is not None and index < n - 1:
            runner = runner.next
            index += 1

        if runner is None:
            return None

        new_node.next = runner.next
        runner.next = new_node
        return self


# These are the tests for your code
my_list = SList()

my_list.add_to_front("are") \
       .add_to_front("Linked lists") \
       .add_to_back("fun!")

my_list.print_values()

print("remove front:", my_list.remove_from_front())
my_list.print_values()

print("remove back:", my_list.remove_from_back())
my_list.print_values()

my_list.add_to_back("cool").add_to_back("stuff")
my_list.print_values()

print("remove val 'cool':", my_list.remove_val("cool"))
my_list.print_values()

my_list.insert_at("NEW", 1)
my_list.print_values()