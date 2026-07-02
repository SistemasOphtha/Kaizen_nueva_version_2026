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
    // 1. Ejecutar consulta SELECT básica
    const basicRes = await client.query('SELECT COUNT(*) FROM "workplans" WHERE "userId" = 22');
    console.log('Total registros básicos en workplans para user 22:', basicRes.rows[0].count);

    // 2. Probar con las fechas
    const dateRes = await client.query(`
      SELECT COUNT(*) FROM "workplans" 
      WHERE "userId" = 22 
      AND "startDate" >= '2026-04-01 05:00:00.000 +00:00' 
      AND "endDate" <= '2026-07-01 22:30:38.691 +00:00'
    `);
    console.log('Total registros filtrados por fecha para user 22:', dateRes.rows[0].count);

    // 3. Probar el JOIN completo
    const joinRes = await client.query(`
      SELECT w.id, w."typeEventId", t.name as event_name 
      FROM "workplans" w
      INNER JOIN "users" u ON w."userId" = u.id AND (u."deletedAt" IS NULL)
      INNER JOIN "type_events" t ON w."typeEventId" = t.id AND (t."deletedAt" IS NULL)
      WHERE w."deletedAt" IS NULL 
      AND w."userId" = 22 
      AND w."startDate" >= '2026-04-01 05:00:00.000 +00:00' 
      AND w."endDate" <= '2026-07-01 22:30:38.691 +00:00'
    `);
    console.log('Registros con JOIN completo:', joinRes.rows);

    // 4. Ver qué hay en type_events
    const typeEvents = await client.query('SELECT id, name FROM "type_events"');
    console.log('\n=== REGISTROS EN type_events ===');
    console.log(typeEvents.rows);

  } finally {
    await client.end();
  }
}

run().catch(console.error);
