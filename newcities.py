import csv

# Open the input file
with open('worldcities.csv', 'r', encoding='utf8') as infile:
    reader = csv.reader(infile, delimiter=',')
    
    # Open the output file
    with open('test.csv', 'w', encoding='utf8', newline='') as outfile:
        writer = csv.writer(outfile)
        index = 0
        # Iterate over each row of the input file
        for row in reader:
            if index == 0:
                index += 1
                print(row)
                new_row = [row[0], row[2], row[3], row[5], row[8]]
                print(row[0], row[2], row[3], row[5], row[8])
                writer.writerow(new_row)
                continue
            # Extract columns 2, 5, 6, and 9 and write them to the output file
            new_row = [row[0], row[2], row[3], row[5], row[8]]
            writer.writerow(new_row)
