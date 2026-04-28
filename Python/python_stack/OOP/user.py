class User:
    def __init__(self, name):
        self.name = name
        self.balance = 0

    def make_deposit(self, amount):
        self.balance += amount
        return self

    def make_withdrawal(self, amount):
        self.balance -= amount
        return self

    def display_user_balance(self):
        print(f"User: {self.name}, Balance: ${self.balance}")
        return self

    def transfer_money(self, other_user, amount):
        self.balance -= amount
        other_user.balance += amount
        return self


# create users
user1 = User("Mostafa")
user2 = User("Youssef")
user3 = User("Mohamed")

# Have the first user make 3 deposits and 1 withdrawal and then display their balance
user1.make_deposit(100).make_deposit(50).make_deposit(25).make_withdrawal(30)
user1.display_user_balance()


# Have the second user make 2 deposits and 2 withdrawals and then display their balance
user2.make_deposit(200).make_deposit(100).make_withdrawal(50).make_withdrawal(25)
user2.display_user_balance()


# Have the third user make 1 deposits and 3 withdrawals and then display their balance
user3.make_deposit(300).make_withdrawal(50).make_withdrawal(50).make_withdrawal(50)
user3.display_user_balance()

# BONUS: Add a transfer_money method; have the first user transfer money to the third user and then print both users' balances
user1.transfer_money(user3, 50)

user1.display_user_balance()
user3.display_user_balance()