import csv
import json

# Open the input file
with open('test.csv', 'r', encoding='utf8') as infile:
    reader = csv.DictReader(infile)
    
    # Group the data by iso2
    data_by_iso2 = {}
    for row in reader:
        iso2 = row['iso2']
        capital = row['capital']
        if iso2 not in data_by_iso2:
            data_by_iso2[iso2] = []
        if row['capital'] is None  or row['capital'] == '':
            continue

        print(iso2, capital)
        data_by_iso2[iso2].append(row)
    
    # Write the output file
    with open('output.json', 'w', encoding='utf8') as outfile:
        json.dump(data_by_iso2, outfile, indent=2)
