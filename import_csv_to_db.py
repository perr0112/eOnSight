import csv
import psycopg2

def import_data_from_csv():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="bridge_db",
            user="bridge_manager",
            password="g0lden_gat3"
        )

        # Open the CSV file
        with open('sample_bridges.csv', 'r') as file:
            reader = csv.reader(file)

            # Skip the header row
            next(reader)

            # Create a cursor object
            with conn.cursor() as cur:
                for row in reader:
                    # Extract data from the CSV row
                    bridge_id, name, latitude, longitude = row

                    # Insert data into the table
                    cur.execute(
                        """
                        INSERT INTO bridges (bridge_id, name, location)
                        VALUES (%s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326))
                        """,
                        (bridge_id, name, longitude, latitude)
                    )
            
            # Commit the transaction
            conn.commit()
            print("Data successfully imported!")
    except Exception as e:
        print(f"Error: {str(e)}")
    
    # Close the connection
    finally:
        if conn is not None:
            conn.close()

# Call the function to import the data
if __name__ == "__main__":
    import_data_from_csv()
