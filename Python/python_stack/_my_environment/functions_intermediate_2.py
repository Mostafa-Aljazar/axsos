# 1. Update Values in Dictionaries and Lists

x = [ [5,2,3], [10,8,9] ]
students = [
    {'first_name': 'Michael', 'last_name': 'Jordan'},
    {'first_name': 'John', 'last_name': 'Rosales'}
]
sports_directory = {
    'basketball': ['Kobe', 'Jordan', 'James', 'Curry'],
    'soccer': ['Messi', 'Ronaldo', 'Rooney']
}
z = [ {'x': 10, 'y': 20} ]

# updates
x[1][0] = 15
students[0]['last_name'] = 'Bryant'
sports_directory['soccer'][0] = 'Andres'
z[0]['y'] = 30

print(x)
print(students)
print(sports_directory)
print(z)


# 2. Iterate Through a List of Dictionaries
def iterateDictionary(some_list):
    for item in some_list:
        output = ""
        for key in item:
            output += f"{key} - {item[key]}, "
        print(output[:-2])  # remove last comma and space

# test
students_list = [
    {'first_name': 'Michael', 'last_name': 'Jordan'},
    {'first_name': 'John', 'last_name': 'Rosales'},
    {'first_name': 'Mark', 'last_name': 'Guillen'},
    {'first_name': 'KB', 'last_name': 'Tonel'}
]

iterateDictionary(students_list)


# 3. Get Values From a List of Dictionaries
def iterateDictionary2(key_name, some_list):
    for item in some_list:
        print(item[key_name])

# test
iterateDictionary2('first_name', students_list)
iterateDictionary2('last_name', students_list)


# 4. Iterate Through a Dictionary with List Values
def printInfo(some_dict):
    for key in some_dict:
        values = some_dict[key]
        print(len(values), key.upper())
        for val in values:
            print(val)
        print()

# test
dojo = {
    'locations': ['San Jose', 'Seattle', 'Dallas', 'Chicago', 'Tulsa', 'DC', 'Burbank'],
    'instructors': ['Michael', 'Amy', 'Eduardo', 'Josh', 'Graham', 'Patrick', 'Minh', 'Devon']
}

printInfo(dojo)