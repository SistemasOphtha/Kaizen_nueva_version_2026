const { Client } = require('pg');

async function run() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5434,
    user: 'postgres',
    password: 'admin',
    database: 'kaizenophtha_db'
  });
  await client.connect();

  try {
    const thirdTypes = await client.query('SELECT * FROM "third_type"');
    console.log('=== THIRD TYPES ===');
    console.log(thirdTypes.rows);

  } finally {
    await client.end();
  }
}

run().catch(console.error);
