import pg8000
import json
from datetime import datetime

tables = [
  'user_classification',
  'region',
  'users',
  'portfolios',
  'third_classification',
  'third_specialty',
  'third_subspecialty',
  'third_type',
  'third',
  'visits',
  'type_events',
  'workplans',
  'justifications',
  'thirds_portfolios',
  'calendar_events',
  'calendar_labels',
  'configs',
  'notifications'
]

def backup():
    # Conexión directa por socket UNIX local
    conn = pg8000.connect(
        unix_sock='/var/run/postgresql/.s.PGSQL.5432',
        user='admin_ophtha',
        password='OphthaSecure2026!',
        database='kaizen_db_nueva'
    )
    cursor = conn.cursor()
    print("Connected to PostgreSQL via Unix socket successfully!")

    sql_content = "-- KAIZEN PRODUCTION DATABASE BACKUP\n"
    sql_content += "SET session_replication_role = 'replica';\n"

    for table in tables:
        print(f"Dumping table: {table}...")
        sql_content += f"\n-- Table: {table}\n"
        sql_content += f"TRUNCATE TABLE \"{table}\" CASCADE;\n"

        # Get columns
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '{table}'")
        columns = [row[0] for row in cursor.fetchall()]
        if not columns:
            print(f"Table {table} has no columns. Skipping.")
            continue

        cols_str = ", ".join(f'"{c}"' for c in columns)

        cursor.execute(f"SELECT {cols_str} FROM \"{table}\"")
        rows = cursor.fetchall()
        if not rows:
            print(f"Table {table} is empty. Skipping.")
            continue

        for row in rows:
            values = []
            for val in row:
                if val is None:
                    values.append("NULL")
                elif isinstance(val, datetime):
                    values.append(f"'{val.isoformat()}'")
                elif isinstance(val, (dict, list)):
                    val_str = json.dumps(val).replace("'", "''")
                    values.append(f"'{val_str}'")
                elif isinstance(val, str):
                    val_str = val.replace("'", "''")
                    values.append(f"'{val_str}'")
                else:
                    values.append(str(val))

            vals_str = ", ".join(values)
            sql_content += f"INSERT INTO \"{table}\" ({cols_str}) VALUES ({vals_str});\n"

    sql_content += "\nSET session_replication_role = 'origin';\n"
    conn.close()

    with open('/home/SIEV/backup_db_prod.sql', 'w', encoding='utf-8') as f:
        f.write(sql_content)

    print("Backup completed successfully! Saved to: /home/SIEV/backup_db_prod.sql")

if __name__ == "__main__":
    backup()
