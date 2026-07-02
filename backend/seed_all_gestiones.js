const { Client } = require('pg');
const crypto = require('crypto');
require('dotenv').config({ path: './.env.dev' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5434'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

const descriptions = [
  'Visita de fidelización a clínicas de la zona',
  'Ruta comercial de presentación de catálogo',
  'Seguimiento y cobro de cartera pendiente',
  'Capacitación técnica de productos de alta velocidad',
  'Asesoría comercial personalizada y auditoría de inventario',
  'Reunión de alineación estratégica con gerencia regional',
  'Inasistencia por cita odontológica preventiva',
  'Ruta de visitas zona norte / centro médico principal',
  'Evento de lanzamiento de nueva línea y relaciones públicas',
  'Auditoría y soporte en droguerías autorizadas'
];

const objectives = [
  'Presentación del portafolio Kaizen 2026',
  'Fidelización de cliente recurrente',
  'Capacitación sobre nuevos lentes inteligentes',
  'Seguimiento de orden logística pendiente',
  'Negociación de volumen trimestral',
  'Cierre de portafolio y firma de acuerdo corporativo',
  'Visita de cortesía y revisión de stock de productos',
  'Atención a reclamo por entrega de insumos'
];

const comments = [
  'El cliente se mostró muy interesado en la nueva línea Ophtha.',
  'Solicitó cotización detallada de 100 unidades de lentes.',
  'Quedamos en revisar inventario la próxima semana.',
  'Todo en orden. Se instalaron los nuevos banners publicitarios.',
  'El médico solicita muestras adicionales para sus pacientes.',
  'Se solucionó el problema de facturación del mes pasado.',
  'Excelente recepción, cliente muy leal al laboratorio.',
  'Pendiente enviar catálogo de accesorios por correo.'
];

const justifications = [
  'Inasistencia por problemas de salud (migraña severa).',
  'No se pudo realizar la visita por bloqueo en la vía principal.',
  'El doctor canceló la cita a último momento por cirugía de urgencia.',
  'Problemas de transporte (fallas mecánicas en el vehículo de la ruta).',
  'Inclemencias climáticas severas impidieron el desplazamiento seguro.',
  'Se priorizó una urgencia comercial en otra sucursal del mismo cliente.'
];

async function main() {
  await client.connect();
  console.log('Starting full database seed for all modules (Portfolios, Workplans, Visits, Justifications, Calendar)...');

  try {
    // 1. Truncar tablas dependientes y principales para poblar limpiamente
    await client.query('TRUNCATE TABLE "thirds_portfolios" RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE "portfolios" RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE "workplans" RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE "visits" RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE "justifications" RESTART IDENTITY CASCADE');
    await client.query('TRUNCATE TABLE "calendar_events" RESTART IDENTITY CASCADE');
    console.log('Tables truncated successfully.');

    // 2. Obtener usuarios activos
    const usersRes = await client.query('SELECT id, "firstName", "lastName" FROM "users" WHERE status = \'active\'');
    const users = usersRes.rows;

    // 3. Obtener clientes (third) válidos globales
    const thirdsRes = await client.query('SELECT id, name, "typeId" FROM "third" WHERE "deletedAt" IS NULL');
    const allThirds = thirdsRes.rows;

    if (users.length === 0 || allThirds.length === 0) {
      console.error('Missing active users or thirds in the DB. Seeding aborted.');
      return;
    }

    let portfolioCount = 0;
    let assocCount = 0;
    let wpCount = 0;
    let visitCount = 0;
    let justCount = 0;
    let calendarCount = 0;

    for (const user of users) {
      console.log(`\nProcessing user: ${user.firstName} ${user.lastName} (ID: ${user.id})...`);

      // A. Crear portafolio para el usuario
      const portName = `Portafolio de ${user.firstName} ${user.lastName}`;
      const portRes = await client.query(
        'INSERT INTO "portfolios" (name, "userId", status, "createdAt", "updatedAt") VALUES ($1, $2, \'active\', NOW(), NOW()) RETURNING id',
        [portName, user.id]
      );
      const portfolioId = portRes.rows[0].id;
      portfolioCount++;

      // B. Asignar 15 clientes aleatorios únicos a este portafolio
      const shuffledThirds = [...allThirds].sort(() => 0.5 - Math.random());
      const userThirds = shuffledThirds.slice(0, 15);

      for (const third of userThirds) {
        await client.query(
          'INSERT INTO "thirds_portfolios" ("portfolioId", "thirdId", approved, status, "createdAt", "updatedAt") VALUES ($1, $2, true, \'active\', NOW(), NOW())',
          [portfolioId, third.id]
        );
        assocCount++;
      }
      console.log(`- Created portfolio ID: ${portfolioId} with 15 assigned thirds.`);

      // C. Crear 10 gestiones aleatorias
      for (let i = 0; i < 10; i++) {
        // Generar fecha en junio/julio de 2026
        const day = Math.floor(Math.random() * 28) + 1;
        const month = Math.random() > 0.4 ? '06' : '07'; 
        const startHour = 8 + Math.floor(Math.random() * 4); // 8 AM a 11 AM
        const endHour = startHour + 2 + Math.floor(Math.random() * 6); // 2 a 8 horas después
        
        const startStr = `2026-${month}-${day.toString().padStart(2, '0')}T${startHour.toString().padStart(2, '0')}:00:00.000Z`;
        const endStr = `2026-${month}-${day.toString().padStart(2, '0')}T${endHour.toString().padStart(2, '0')}:00:00.000Z`;

        // Seleccionar cliente de su portafolio personal para mayor coherencia
        const randomThird = userThirds[Math.floor(Math.random() * userThirds.length)];

        // I. Insertar Plan de Trabajo
        const wpDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
        const wpRes = await client.query(
          'INSERT INTO "workplans" ("userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt") VALUES ($1, 2, $2, $3, $4, \'active\', NOW(), NOW()) RETURNING id',
          [user.id, startStr, endStr, `${wpDesc} (Simulado #${i+1})`]
        );
        const workplanId = wpRes.rows[0].id;
        wpCount++;

        // Crear evento de calendario para el Plan de Trabajo (label: 2)
        const wpEventTitle = wpDesc.length > 20 ? wpDesc.substring(0, 20) + '...' : wpDesc;
        const wpEventId = crypto.randomUUID();
        await client.query(
          'INSERT INTO "calendar_events" (id, title, "allDay", start, "end", "extendedProps", "createdAt", "updatedAt") VALUES ($1, $2, false, $3, $4, $5, NOW(), NOW())',
          [
            wpEventId,
            wpEventTitle,
            startStr,
            endStr,
            JSON.stringify({
              desc: `${wpDesc} (Simulado #${i+1})`,
              label: 2,
              component: {
                id: workplanId,
                type: 'workplans',
                route: `/dashboards/workplans/${workplanId}`
              }
            })
          ]
        );
        calendarCount++;

        // II. Insertar Visitas
        const visitObj = objectives[Math.floor(Math.random() * objectives.length)];
        const visitComm = comments[Math.floor(Math.random() * comments.length)];
        const visitRes = await client.query(
          'INSERT INTO "visits" ("typeId", "thirdId", "userId", date, objective, comment, status, "isVerified", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, \'active\', false, NOW(), NOW()) RETURNING id',
          [randomThird.typeId, randomThird.id, user.id, startStr, `${visitObj} (Simulado #${i+1})`, visitComm]
        );
        const visitId = visitRes.rows[0].id;
        visitCount++;

        // Crear evento de calendario para la Visita (label: 1)
        const visitTitleSource = visitObj || randomThird.name || 'Visita';
        const visitEventTitle = visitTitleSource.length > 20 ? visitTitleSource.substring(0, 20) + '...' : visitTitleSource;
        const visitEventId = crypto.randomUUID();
        await client.query(
          'INSERT INTO "calendar_events" (id, title, "allDay", start, "end", "extendedProps", "createdAt", "updatedAt") VALUES ($1, $2, true, $3, $4, $5, NOW(), NOW())',
          [
            visitEventId,
            visitEventTitle,
            startStr,
            startStr,
            JSON.stringify({
              desc: `${visitObj} (Simulado #${i+1})`,
              label: 1,
              component: {
                id: visitId,
                type: 'visits',
                route: `/apps/visits/${visitId}`
              }
            })
          ]
        );
        calendarCount++;

        // III. Insertar Justificación
        const justDesc = justifications[Math.floor(Math.random() * justifications.length)];
        await client.query(
          'INSERT INTO "justifications" ("thirdId", "userId", date, "dateToJustify", description, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, \'active\', NOW(), NOW())',
          [randomThird.id, user.id, startStr, startStr, `${justDesc} (Simulado #${i+1})`]
        );
        justCount++;
      }
    }

    // 5. Resetear autoincrementables
    await client.query('SELECT setval(pg_get_serial_sequence(\'"portfolios"\', \'id\'), coalesce(max(id), 1)) FROM "portfolios"');
    await client.query('SELECT setval(pg_get_serial_sequence(\'"thirds_portfolios"\', \'id\'), coalesce(max(id), 1)) FROM "thirds_portfolios"');
    await client.query('SELECT setval(pg_get_serial_sequence(\'"workplans"\', \'id\'), coalesce(max(id), 1)) FROM "workplans"');
    await client.query('SELECT setval(pg_get_serial_sequence(\'"visits"\', \'id\'), coalesce(max(id), 1)) FROM "visits"');
    await client.query('SELECT setval(pg_get_serial_sequence(\'"justifications"\', \'id\'), coalesce(max(id), 1)) FROM "justifications"');

    console.log('\n================ FINAL SEEDING SUMMARY ================');
    console.log(`Portafolios creados:            ${portfolioCount}`);
    console.log(`Asignaciones de Clientes:       ${assocCount}`);
    console.log(`Planes de Trabajo creados:      ${wpCount}`);
    console.log(`Visitas creadas:                ${visitCount}`);
    console.log(`Justificaciones creadas:        ${justCount}`);
    console.log(`Eventos del Calendario creados: ${calendarCount}`);
    console.log('=======================================================');

  } finally {
    await client.end();
  }
}

main().catch(console.error);
