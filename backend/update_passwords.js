const { Client } = require('pg');
const bcrypt = require('bcryptjs');
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Cmdev2023*', salt);

  console.log('Updating password for gerencia@siev.co...');
  const res = await client.query(
    'UPDATE "users" SET password = $1 WHERE email = $2',
    [hashedPassword, 'gerencia@siev.co']
  );
  console.log(`Password updated. Rows affected: ${res.rowCount}`);

  await client.end();
}

main().catch(console.error);
