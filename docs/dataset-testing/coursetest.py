import csv

with open('raw-data/subjectsraw.txt', 'r') as file:
    lines = file.readlines()

data = []

for line in lines:
    line = line.strip()
    if len(line) <= 1:
        continue
    parts = line.split('-', 1)

    if len(parts) == 2:
        subject_code = parts[0].strip()
        subject = parts[1].strip()

        data.append((subject_code, subject))

with open('subjectCode-subjectName.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['SubjectCode', 'Subject'])
    writer.writerows(data)