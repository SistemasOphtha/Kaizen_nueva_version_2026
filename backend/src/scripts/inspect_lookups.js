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

  const types = await client.query('SELECT * FROM "third_type"');
  console.log('Third Types:');
  console.log(JSON.stringify(types.rows, null, 2));

  const classifications = await client.query('SELECT * FROM "third_classification"');
  console.log('Third Classifications:');
  console.log(JSON.stringify(classifications.rows, null, 2));

  const specialties = await client.query('SELECT * FROM "third_specialty"');
  console.log('Third Specialties:');
  console.log(JSON.stringify(specialties.rows, null, 2));

  const regions = await client.query('SELECT * FROM "region"');
  console.log('Regions:');
  console.log(JSON.stringify(regions.rows, null, 2));

  await client.end();
}

main().catch(console.error);
