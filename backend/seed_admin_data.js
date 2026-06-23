const { Client } = require('pg');
require('dotenv').config({ path: './.env' }); // Loads appropriate .env file

const isProd = process.env.NODE_ENV === 'production';

const client = new Client({
  host: process.env.MYSQLDB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5434'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

async function run() {
  await client.connect();
  console.log(`Connected to database in ${isProd ? 'PRODUCTION' : 'LOCAL'} environment.`);

  try {
    const userId = 12; // comunicaciones@laboratorioophtha.com
    
    // 1. Ensure the user exists
    const resUser = await client.query('SELECT id, email FROM "users" WHERE id = $1', [userId]);
    if (resUser.rows.length === 0) {
      console.error(`User with ID ${userId} not found in the database. Seeding aborted.`);
      return;
    }
    console.log(`Found user: ${resUser.rows[0].email}`);

    // 2. Ensure portfolio exists
    const resPortfolio = await client.query('SELECT id FROM "portfolios" WHERE "userId" = $1', [userId]);
    let portfolioId;
    if (resPortfolio.rows.length === 0) {
      console.log(`Creating portfolio for user ${userId}...`);
      const insPortfolio = await client.query(
        'INSERT INTO "portfolios" (name, "userId", status, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id',
        ['Portafolio de Johana Londoño', userId, 'active']
      );
      portfolioId = insPortfolio.rows[0].id;
    } else {
      portfolioId = resPortfolio.rows[0].id;
    }
    console.log(`Portfolio ID for user ${userId}: ${portfolioId}`);

    // 3. Associate some active panels/thirds with her portfolio
    const thirdIdsToAssociate = [5, 7, 11, 12, 13, 14, 15];
    console.log(`Associating panels ${thirdIdsToAssociate.join(', ')} to portfolio ${portfolioId}...`);
    for (const thirdId of thirdIdsToAssociate) {
      const checkAssoc = await client.query(
        'SELECT id FROM "thirds_portfolios" WHERE "portfolioId" = $1 AND "thirdId" = $2',
        [portfolioId, thirdId]
      );
      if (checkAssoc.rows.length === 0) {
        await client.query(
          'INSERT INTO "thirds_portfolios" ("portfolioId", "thirdId", approved, status, "createdAt", "updatedAt") VALUES ($1, $2, true, \'active\', NOW(), NOW())',
          [portfolioId, thirdId]
        );
      } else {
        await client.query(
          'UPDATE "thirds_portfolios" SET approved = true, status = \'active\', "updatedAt" = NOW() WHERE "portfolioId" = $1 AND "thirdId" = $2',
          [portfolioId, thirdId]
        );
      }
    }

    // 4. Seed visits for user 12
    console.log('Seeding visits...');
    const visitsToSeed = [
      {
        id: 201,
        typeId: 1, // Visita médica
        thirdId: 5,
        objective: 'Presentación de la nueva línea de lentes de contacto premium',
        comment: 'El cliente se mostró receptivo y solicitó cotización de 50 unidades.',
        date: '2026-06-18T14:30:00.000Z',
        status: 'active'
      },
      {
        id: 202,
        typeId: 1,
        thirdId: 7,
        objective: 'Seguimiento de orden de compra pendiente',
        comment: 'Se resolvió la duda de logística, el pedido llegará esta misma semana.',
        date: '2026-06-20T10:00:00.000Z',
        status: 'active'
      },
      {
        id: 203,
        typeId: 1,
        thirdId: 11,
        objective: 'Entrega de material publicitario y cartillas Kaizen',
        comment: 'Se instalaron los nuevos exhibidores en el local principal.',
        date: '2026-06-22T16:00:00.000Z',
        status: 'active'
      }
    ];

    for (const visit of visitsToSeed) {
      const checkVisit = await client.query('SELECT id FROM "visits" WHERE id = $1', [visit.id]);
      if (checkVisit.rows.length === 0) {
        await client.query(
          'INSERT INTO "visits" (id, "typeId", "thirdId", "userId", date, objective, comment, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())',
          [visit.id, visit.typeId, visit.thirdId, userId, visit.date, visit.objective, visit.comment, visit.status]
        );
      } else {
        await client.query(
          'UPDATE "visits" SET "typeId" = $2, "thirdId" = $3, "userId" = $4, date = $5, objective = $6, comment = $7, status = $8, "updatedAt" = NOW() WHERE id = $1',
          [visit.id, visit.typeId, visit.thirdId, userId, visit.date, visit.objective, visit.comment, visit.status]
        );
      }
    }

    // 5. Seed workplans for user 12
    console.log('Seeding workplans...');
    const workplansToSeed = [
      {
        id: 201,
        typeEventId: 2, // Plan de trabajo
        startDate: '2026-06-15T08:00:00.000Z',
        endDate: '2026-06-19T18:00:00.000Z',
        description: 'Supervisión y auditoría en clínicas de Antioquia',
        status: 'active'
      },
      {
        id: 202,
        typeEventId: 2,
        startDate: '2026-06-22T08:00:00.000Z',
        endDate: '2026-06-26T18:00:00.000Z',
        description: 'Revisión y acompañamiento del plan de visitas de representantes',
        status: 'active'
      }
    ];

    for (const wp of workplansToSeed) {
      const checkWp = await client.query('SELECT id FROM "workplans" WHERE id = $1', [wp.id]);
      if (checkWp.rows.length === 0) {
        await client.query(
          'INSERT INTO "workplans" (id, "userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
          [wp.id, userId, wp.typeEventId, wp.startDate, wp.endDate, wp.description, wp.status]
        );
      } else {
        await client.query(
          'UPDATE "workplans" SET "userId" = $2, "typeEventId" = $3, "startDate" = $4, "endDate" = $5, description = $6, status = $7, "updatedAt" = NOW() WHERE id = $1',
          [wp.id, userId, wp.typeEventId, wp.startDate, wp.endDate, wp.description, wp.status]
        );
      }
    }

    // 6. Seed justifications for user 12
    console.log('Seeding justifications...');
    const justificationsToSeed = [
      {
        id: 201,
        thirdId: 12,
        date: '2026-06-05T19:39:15.000Z',
        dateToJustify: '2026-05-31T23:59:59.000Z',
        description: 'No se pudo concretar la visita debido a que el optómetra estuvo incapacitado.',
        status: 'active'
      },
      {
        id: 202,
        thirdId: 13,
        date: '2026-06-05T19:39:15.000Z',
        dateToJustify: '2026-05-31T23:59:59.000Z',
        description: 'El cliente se encontraba en un congreso médico internacional de oftalmología.',
        status: 'active'
      }
    ];

    for (const just of justificationsToSeed) {
      const checkJust = await client.query('SELECT id FROM "justifications" WHERE id = $1', [just.id]);
      if (checkJust.rows.length === 0) {
        await client.query(
          'INSERT INTO "justifications" (id, "thirdId", "userId", date, "dateToJustify", description, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
          [just.id, just.thirdId, userId, just.date, just.dateToJustify, just.description, just.status]
        );
      } else {
        await client.query(
          'UPDATE "justifications" SET "thirdId" = $2, "userId" = $3, date = $4, "dateToJustify" = $5, description = $6, status = $7, "updatedAt" = NOW() WHERE id = $1',
          [just.id, just.thirdId, userId, just.date, just.dateToJustify, just.description, just.status]
        );
      }
    }

    // 7. Seed calendar events for user 12 (linked to visits/workplans)
    console.log('Seeding calendar events...');
    const calendarEventsToSeed = [
      {
        id: 'cal-event-12-visit-1',
        title: 'Visita CCMOD',
        allDay: true,
        start: '2026-06-18T14:30:00.000Z',
        end: '2026-06-18T14:30:00.000Z',
        extendedProps: {
          desc: 'Presentación de la nueva línea de lentes de contacto premium',
          label: 1, // Visita
          component: {
            id: 201,
            type: 'visits',
            route: '/apps/visits/201'
          }
        }
      },
      {
        id: 'cal-event-12-visit-2',
        title: 'Visita NATALIA CAMILA',
        allDay: true,
        start: '2026-06-20T10:00:00.000Z',
        end: '2026-06-20T10:00:00.000Z',
        extendedProps: {
          desc: 'Seguimiento de orden de compra pendiente',
          label: 1, // Visita
          component: {
            id: 202,
            type: 'visits',
            route: '/apps/visits/202'
          }
        }
      },
      {
        id: 'cal-event-12-wp-2',
        title: 'Acompañamiento Representantes',
        allDay: false,
        start: '2026-06-22T08:00:00.000Z',
        end: '2026-06-26T18:00:00.000Z',
        extendedProps: {
          desc: 'Revisión y acompañamiento del plan de visitas de representantes',
          label: 2, // Plan de trabajo
          component: {
            id: 202,
            type: 'workplans',
            route: '/dashboards/workplans/202'
          }
        }
      }
    ];

    for (const calEv of calendarEventsToSeed) {
      const checkEv = await client.query('SELECT id FROM "calendar_events" WHERE id = $1', [calEv.id]);
      if (checkEv.rows.length === 0) {
        await client.query(
          'INSERT INTO "calendar_events" (id, title, "allDay", start, "end", "extendedProps", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
          [calEv.id, calEv.title, calEv.allDay, calEv.start, calEv.end, JSON.stringify(calEv.extendedProps)]
        );
      } else {
        await client.query(
          'UPDATE "calendar_events" SET title = $2, "allDay" = $3, start = $4, "end" = $5, "extendedProps" = $6, "updatedAt" = NOW() WHERE id = $1',
          [calEv.id, calEv.title, calEv.allDay, calEv.start, calEv.end, JSON.stringify(calEv.extendedProps)]
        );
      }
    }

    // Reset sequences in PostgreSQL
    console.log('Resetting database auto-increment sequences...');
    const tablesToReset = ['portfolios', 'visits', 'workplans', 'justifications', 'thirds_portfolios'];
    for (const table of tablesToReset) {
      await client.query(`SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), coalesce(max(id), 1)) FROM "${table}"`);
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await client.end();
  }
}

run();
