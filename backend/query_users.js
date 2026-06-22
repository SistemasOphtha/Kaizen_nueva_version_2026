const { Client } = require('pg');
require('dotenv').config({ path: './.env.dev' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5434'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

async function main() {
  await client.connect();
  const res = await client.query('SELECT id, email, "firstName", "lastName", "classificationId", category FROM "users" WHERE "deletedAt" IS NULL ORDER BY id');
  console.log(JSON.stringify(res.rows, null, 2));
  await client.end();
}

main().catch(console.error);



