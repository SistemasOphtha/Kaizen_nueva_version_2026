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

  // Check columns in table "third"
  const checkColumnsQuery = `
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'third';
  `;
  const res = await client.query(checkColumnsQuery);
  const existingColumns = res.rows.map(row => row.column_name);
  console.log('Existing columns in third:', existingColumns);

  // Add habeasDataConsent
  if (!existingColumns.includes('habeasDataConsent')) {
    console.log('Adding column habeasDataConsent');
    await client.query('ALTER TABLE "third" ADD COLUMN "habeasDataConsent" BOOLEAN DEFAULT FALSE;');
  }

  // Add habeasDataFileUrl
  if (!existingColumns.includes('habeasDataFileUrl')) {
    console.log('Adding column habeasDataFileUrl');
    await client.query('ALTER TABLE "third" ADD COLUMN "habeasDataFileUrl" VARCHAR(255);');
  }

  // Add habeasDataSignature
  if (!existingColumns.includes('habeasDataSignature')) {
    console.log('Adding column habeasDataSignature');
    await client.query('ALTER TABLE "third" ADD COLUMN "habeasDataSignature" TEXT;');
  }

  console.log('Database columns updated successfully');
  await client.end();
}

main().catch(console.error);
