const mysql = require('mysql2/promise');
const { Client } = require('pg');

const tables = [
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
];

async function migrate() {
  const mysqlConn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ls(9he)#11sd',
    database: 'kaizenophtha_db'
  });

  const pgClient = new Client({
    host: '127.0.0.1',
    port: 5434,
    user: 'postgres',
    password: 'admin',
    database: 'kaizenophtha_db'
  });
  await pgClient.connect();

  console.log('Connected to MySQL and PostgreSQL.');

  // Disable triggers temporarily to prevent foreign key check errors during out-of-order operations (if any)
  await pgClient.query('SET session_replication_role = "replica";');

  try {
    for (const table of tables) {
      console.log(`Migrating table ${table}...`);
      
      // Truncate PostgreSQL table to ensure clean slate
      await pgClient.query(`TRUNCATE TABLE "${table}" CASCADE;`);

      // Read from MySQL
      const [rows] = await mysqlConn.query(`SELECT * FROM \`${table}\``);
      if (rows.length === 0) {
        console.log(`Table ${table} is empty. Skipping.`);
        continue;
      }

      // Query columns that exist in the PostgreSQL table
      const pgColsRes = await pgClient.query(
        `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
        [table]
      );
      const pgColumns = pgColsRes.rows.map(r => r.column_name);

      // Filter columns: only migrate those present in both databases
      const columns = Object.keys(rows[0]).filter(c => pgColumns.includes(c));
      
      const colsStr = columns.map(c => `"${c}"`).join(', ');
      const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');
      
      const insertQuery = `INSERT INTO "${table}" (${colsStr}) VALUES (${placeholders})`;

      // Insert rows
      for (const row of rows) {
        const values = columns.map(col => {
          const val = row[col];
          // Handle Date fields, catching any invalid ones (like MySQL 0000-00-00)
          if (val instanceof Date) {
            if (isNaN(val.getTime())) {
              return new Date(0); // Fallback to 1970-01-01
            }
            return val;
          }
          // Handle JSON/Object fields for PostgreSQL
          if (val !== null && typeof val === 'object') {
            return JSON.stringify(val);
          }
          return val;
        });
        await pgClient.query(insertQuery, values);
      }
      console.log(`Migrated ${rows.length} rows for ${table}.`);

      // Reset SERIAL sequence in PostgreSQL to prevent ID collision in future inserts
      const hasSerial = columns.includes('id') && table !== 'calendar_events';
      if (hasSerial) {
        await pgClient.query(`SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), coalesce(max(id), 1)) FROM "${table}"`);
      }
    }
    console.log('Migration completed successfully!');
  } finally {
    // Re-enable triggers
    await pgClient.query('SET session_replication_role = "origin";');
    await mysqlConn.end();
    await pgClient.end();
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
