const { Client } = require('pg');
require('dotenv').config({ path: './.env.dev' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5434'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

const mockWorkplans = [
  {
    userId: 2, // Cesar Mendoza
    typeEventId: 2, // Plan de trabajo
    startDate: '2026-06-01T08:00:00.000Z',
    endDate: '2026-06-05T18:00:00.000Z',
    description: 'Plan de trabajo semanal - Bogotá',
    status: 'active'
  },
  {
    userId: 8, // Cindy Rincon
    typeEventId: 2, // Plan de trabajo
    startDate: '2026-06-02T08:00:00.000Z',
    endDate: '2026-06-06T18:00:00.000Z',
    description: 'Plan de trabajo semanal - Medellín',
    status: 'active'
  },
  {
    userId: 6, // Angel Tenjo
    typeEventId: 1, // Inasistencia
    startDate: '2026-06-03T08:00:00.000Z',
    endDate: '2026-06-03T18:00:00.000Z',
    description: 'Incapacidad médica por control odontológico',
    status: 'active'
  },
  {
    userId: 18, // Juan Diego Echeverri
    typeEventId: 2, // Plan de trabajo
    startDate: '2026-06-01T08:00:00.000Z',
    endDate: '2026-06-04T18:00:00.000Z',
    description: 'Visitas de campo y fidelización - Cali',
    status: 'active'
  },
  {
    userId: 19, // Juan Mesa
    typeEventId: 2, // Plan de trabajo
    startDate: '2026-06-02T08:00:00.000Z',
    endDate: '2026-06-05T18:00:00.000Z',
    description: 'Ruta comercial zona norte',
    status: 'active'
  }
];

async function main() {
  await client.connect();
  console.log('Connected to DB for seeding workplans.');

  for (const wp of mockWorkplans) {
    // Check if a similar workplan already exists to prevent duplicate seeding
    const checkRes = await client.query(
      'SELECT id FROM "workplans" WHERE "userId" = $1 AND "startDate" = $2',
      [wp.userId, wp.startDate]
    );

    if (checkRes.rows.length === 0) {
      console.log(`Inserting workplan for user ${wp.userId}...`);
      await client.query(
        'INSERT INTO "workplans" ("userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
        [wp.userId, wp.typeEventId, wp.startDate, wp.endDate, wp.description, wp.status]
      );
    } else {
      console.log(`Workplan for user ${wp.userId} on ${wp.startDate} already exists. Skipping.`);
    }
  }

  // Also reset serial sequence
  await client.query('SELECT setval(pg_get_serial_sequence(\'"workplans"\', \'id\'), coalesce(max(id), 1)) FROM "workplans"');

  console.log('Seeding completed successfully!');
  await client.end();
}

main().catch(console.error);
