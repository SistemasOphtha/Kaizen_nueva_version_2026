const { Client } = require('pg');
require('dotenv').config({ path: 'D:/CLIENTES/ophtha/proyecto_kaizen/backend/.env' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5434'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

async function main() {
  await client.connect();
  console.log('Connected to PG');

  const tables = [
    'user_classification',  'region',
    'third_classification', 'third_specialty',
    'third_subspecialty',   'third_type',
    'third',                'notifications',
    'visits',               'type_events',
    'thirds_portfolios',    'calendar_events',
    'calendar_labels',      'configs',
    'users',                'portfolios',
    'workplans',            'justifications'
  ];

  for (const table of tables) {
    try {
      const res = await client.query(`SELECT COUNT(*) FROM "${table}"`);
      console.log(`Table "${table}": ${res.rows[0].count} rows`);
    } catch (err) {
      console.error(`Error counting "${table}":`, err.message);
    }
  }

  await client.end();
}

main().catch(console.error);
