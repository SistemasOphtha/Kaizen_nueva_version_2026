const { Client } = require('pg');
require('dotenv').config({ path: './.env.dev' });

async function run() {
  // Intentar conectar con la configuración que el backend usa para ver qué base de datos lee
  const host = process.env.MYSQLDB_HOST === '127.0.0.1' ? 'db' : (process.env.MYSQLDB_HOST || 'db');
  const port = parseInt(process.env.DB_PORT || '5432');
  const user = process.env.MYSQLDB_USER || 'postgres';
  const password = process.env.MYSQLDB_PASSWORD || 'admin';
  const database = process.env.MYSQLDB_DATABASE || 'kaizenophtha_db';

  console.log('Backend DB Config Connection Params:');
  console.log({ host, port, user, database });

  const client = new Client({ host, port, user, password, database });
  await client.connect();

  try {
    const res = await client.query('SELECT id, "userId", "startDate", description FROM workplans WHERE "userId" = 22');
    console.log('\n=== WORKPLANS FOUND BY BACKEND CONTROLLER ===');
    console.log(res.rows);
  } catch (err) {
    console.error('Error during query:', err);
  } finally {
    await client.end();
  }
}

run().catch(console.error);
