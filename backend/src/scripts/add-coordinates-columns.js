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
  console.log('Connected to PG database for updating coordinates columns');

  // Update table "third" (Doctor/Pharmacy Panel)
  const resThird = await client.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'third';
  `);
  const columnsThird = resThird.rows.map(row => row.column_name);
  console.log('Existing columns in third:', columnsThird);

  if (!columnsThird.includes('latitude')) {
    console.log('Adding column "latitude" to table "third"');
    await client.query('ALTER TABLE "third" ADD COLUMN "latitude" DOUBLE PRECISION;');
  }
  if (!columnsThird.includes('longitude')) {
    console.log('Adding column "longitude" to table "third"');
    await client.query('ALTER TABLE "third" ADD COLUMN "longitude" DOUBLE PRECISION;');
  }

  // Update table "visits"
  const resVisits = await client.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'visits';
  `);
  const columnsVisits = resVisits.rows.map(row => row.column_name);
  console.log('Existing columns in visits:', columnsVisits);

  if (!columnsVisits.includes('latitude')) {
    console.log('Adding column "latitude" to table "visits"');
    await client.query('ALTER TABLE "visits" ADD COLUMN "latitude" DOUBLE PRECISION;');
  }
  if (!columnsVisits.includes('longitude')) {
    console.log('Adding column "longitude" to table "visits"');
    await client.query('ALTER TABLE "visits" ADD COLUMN "longitude" DOUBLE PRECISION;');
  }
  if (!columnsVisits.includes('isVerified')) {
    console.log('Adding column "isVerified" to table "visits"');
    await client.query('ALTER TABLE "visits" ADD COLUMN "isVerified" BOOLEAN DEFAULT FALSE;');
  }

  console.log('Database coordinates columns updated successfully');
  await client.end();
}

main().catch(console.error);
