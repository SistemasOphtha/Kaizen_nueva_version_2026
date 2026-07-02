const fs = require('fs');
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

async function backup() {
  const pgClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin_ophtha',
    password: 'OphthaSecure2026!',
    database: 'kaizen_db_nueva'
  });
  await pgClient.connect();
  console.log('Connected to Database successfully!');

  let sqlContent = '-- KAIZEN PRODUCTION DATABASE BACKUP\n';
  sqlContent += 'SET session_replication_role = "replica";\n'; // Disable FK check for insert order

  try {
    for (const table of tables) {
      console.log(`Dumping table: ${table}...`);
      sqlContent += `\n-- Table: ${table}\n`;
      sqlContent += `TRUNCATE TABLE "${table}" CASCADE;\n`;

      const res = await pgClient.query(`SELECT * FROM "${table}"`);
      if (res.rows.length === 0) {
        console.log(`Table ${table} is empty. Skipping.`);
        continue;
      }

      const columns = Object.keys(res.rows[0]);
      const colsStr = columns.map(c => `"${c}"`).join(', ');

      for (const row of res.rows) {
        const valuesStr = columns.map(col => {
          const val = row[col];
          if (val === null) return 'NULL';
          if (val instanceof Date) return `'${val.toISOString()}'`;
          if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          return val;
        }).join(', ');

        sqlContent += `INSERT INTO "${table}" (${colsStr}) VALUES (${valuesStr});\n`;
      }
    }

    sqlContent += '\nSET session_replication_role = "origin";\n'; // Restore FK check

    const destPath = '/home/SIEV/backup_db_prod.sql';
    fs.writeFileSync(destPath, sqlContent, 'utf8');
    console.log(`Backup completed successfully! Saved to: ${destPath}`);
  } finally {
    await pgClient.end();
  }
}

backup().catch(console.error);
