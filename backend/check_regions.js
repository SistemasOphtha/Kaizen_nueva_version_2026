const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '/var/run/postgresql',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.MYSQLDB_USER || 'admin_ophtha',
  password: process.env.MYSQLDB_PASSWORD || 'OphthaSecure2026!',
  database: process.env.MYSQLDB_DATABASE || 'kaizen_db_nueva',
});

async function run() {
  await client.connect();
  try {
    const res = await client.query(`
      SELECT r.id, r.name, COUNT(t.id) as count
      FROM region r
      LEFT JOIN third t ON t."regionId" = r.id
      GROUP BY r.id, r.name
      ORDER BY count DESC
    `);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}
run();
