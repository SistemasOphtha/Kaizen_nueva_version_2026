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
  
  // Query matching Sequelize getWorkplans query
  const res = await client.query(`
    SELECT w.id, w."userId", u."firstName", u."lastName", w."startDate", w."endDate", w.description, r.name as region_name, te.name as event_name
    FROM "workplans" w
    INNER JOIN "users" u ON w."userId" = u.id AND u."deletedAt" IS NULL
    LEFT JOIN "region" r ON u."regionId" = r.id AND r."deletedAt" IS NULL
    INNER JOIN "type_events" te ON w."typeEventId" = te.id AND te."deletedAt" IS NULL
    WHERE w."startDate" >= '2026-06-01T05:00:00.000Z'
      AND w."endDate" <= '2026-06-06T23:17:30.978Z'
  `);
  
  console.log('SQL query results:');
  console.log(JSON.stringify(res.rows, null, 2));

  await client.end();
}

main().catch(console.error);
