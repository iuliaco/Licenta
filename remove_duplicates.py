import json

# Read JSON file
with open("cities.json", "r") as file:
    data = json.load(file)

# Remove duplicate cities from lists
for country, cities in data.items():
    data[country] = list(set(cities))

# Write cleaned JSON back to file
with open("cities.json", "w") as file:
    json.dump(data, file, indent=2)

print("Duplicate cities removed from cities.json")
