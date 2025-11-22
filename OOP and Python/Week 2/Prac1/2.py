class Person:
    def __init__(self, name, age, height, weight) -> None:
        self.name = name
        self.age = age
        self.height = height
        self.weight = weight


class Cricketer(Person):
    def __init__(self, name, age, height, weight) -> None:
        super().__init__(name, age, height, weight)

    # Operator Overloading: compare age
    def __gt__(self, other):
        return self.age > other.age


# Players
sakib = Cricketer('Sakib', 38, 68, 91)
musfiq = Cricketer('Rahim', 36, 68, 88)
kamal = Cricketer('Kamal', 39, 68, 94)
jack = Cricketer('Jack', 38, 68, 91)
kalam = Cricketer('Kalam', 37, 68, 95)

# Compare ages using '>'
print(kamal > sakib)   # True (Kamal is older than Sakib)
print(sakib > musfiq)  # True (Sakib is older than Musfiq)
print(jack > kalam)    # True (38 > 37)
print(musfiq > kamal)  # False (36 is not greater than 39)
