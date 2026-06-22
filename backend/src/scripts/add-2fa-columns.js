const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

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

  // Check columns in table "users"
  const checkColumnsQuery = `
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'users';
  `;
  const res = await client.query(checkColumnsQuery);
  const existingColumns = res.rows.map(row => row.column_name);
  console.log('Existing columns in users:', existingColumns);

  // Add twoFactorEnabled
  if (!existingColumns.includes('twoFactorEnabled')) {
    console.log('Adding column twoFactorEnabled');
    await client.query('ALTER TABLE "users" ADD COLUMN "twoFactorEnabled" BOOLEAN DEFAULT FALSE;');
  }

  // Add twoFactorSecret
  if (!existingColumns.includes('twoFactorSecret')) {
    console.log('Adding column twoFactorSecret');
    await client.query('ALTER TABLE "users" ADD COLUMN "twoFactorSecret" VARCHAR(255);');
  }

  console.log('Database columns updated successfully');
  await client.end();
}

main().catch(console.error);
