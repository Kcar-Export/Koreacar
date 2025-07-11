import csv
import mysql.connector

# Connect to your MySQL DB (fill in your credentials)
conn = mysql.connector.connect(
    host='localhost',
    user='root',                # <-- your MySQL username
    password='kcarexport',      # <-- your MySQL password
    database='car_listings'     # <-- your database name
)
cursor = conn.cursor()

# Ensure seq is UNIQUE to prevent duplicates (run this once in your DB if not already set)
# cursor.execute("ALTER TABLE karaba_cars ADD UNIQUE (seq)")

with open('karaba.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        cursor.execute("""
            INSERT IGNORE INTO karaba_cars (
                seq, url, title, info, price, model, registration_date, transmission,
                color, manufacturer_year, mileage, fuel, car_number, accidents,
                features, image_urls
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            row.get('seq'),
            row.get('url'),
            row.get('title'),
            row.get('info'),
            row.get('price'),
            row.get('model'),
            row.get('registration_date'),
            row.get('transmission'),
            row.get('color'),
            row.get('manufacturer_year'),
            row.get('mileage'),
            row.get('fuel'),
            row.get('car_number'),
            row.get('accidents'),
            row.get('features'),
            row.get('image_urls'),
        ))

conn.commit()
cursor.close()
conn.close()
print("✅ CSV data inserted successfully.")