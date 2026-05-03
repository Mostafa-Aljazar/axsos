class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.health = 100
        self.happiness = 100

    def display_info(self):
        print(f"Name: {self.name}, Age: {self.age}, Health: {self.health}, Happiness: {self.happiness}")

    def feed(self):
        self.health += 10
        self.happiness += 10
        return self


class Lion(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)
        self.roar_power = 80

    def feed(self):
        self.health += 15
        self.happiness += 5
        return self


class Monkey(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)
        self.agility = 90

    def feed(self):
        self.health += 10
        self.happiness += 20
        return self


class Bear(Animal):
    def __init__(self, name, age):
        super().__init__(name, age)
        self.strength = 100

    def feed(self):
        self.health += 20
        self.happiness += 10
        return self


class Zoo:
    def __init__(self, name):
        self.name = name
        self.animals = []

    def add_animal(self, animal):
        self.animals.append(animal)
        return self

    def print_all_info(self):
        print("-" * 10, self.name, "-" * 10)
        for animal in self.animals:
            animal.display_info()


# ---------------- TESTING ----------------

zoo1 = Zoo("John's Zoo")

lion1 = Lion("Simba", 5)
lion2 = Lion("Nala", 4)
monkey1 = Monkey("George", 3)
bear1 = Bear("Baloo", 7)

zoo1.add_animal(lion1)
zoo1.add_animal(lion2)
zoo1.add_animal(monkey1)
zoo1.add_animal(bear1)

lion1.feed()
monkey1.feed()
bear1.feed()

zoo1.print_all_info()