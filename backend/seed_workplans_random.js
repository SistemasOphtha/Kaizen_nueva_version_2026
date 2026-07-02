const { Client } = require('pg');
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

async function main() {
  await client.connect();
  console.log('Connected to DB for seeding random workplans.');

  try {
    // 1. Obtener todos los usuarios activos
    const usersRes = await client.query('SELECT id, "firstName", "lastName" FROM "users" WHERE status = \'active\'');
    const users = usersRes.rows;
    console.log(`Found ${users.length} active users to seed.`);

    // 2. Obtener los tipos de eventos
    const typeEventsRes = await client.query('SELECT id FROM "type_events"');
    const typeEvents = typeEventsRes.rows.map(r => r.id);

    if (typeEvents.length === 0) {
      console.error('No type events found in DB. Cannot seed.');
      return;
    }

    let insertedCount = 0;

    for (const user of users) {
      console.log(`Generating 10 workplans for ${user.firstName} ${user.lastName} (ID: ${user.id})...`);
      
      for (let i = 0; i < 10; i++) {
        // Generar días aleatorios entre 1 y 28 para evitar problemas de mes
        const day = Math.floor(Math.random() * 28) + 1;
        const month = Math.random() > 0.4 ? '06' : '07'; // 60% en junio, 40% en julio
        const startHour = 8 + Math.floor(Math.random() * 4); // inicio entre 8 AM y 11 AM
        const endHour = startHour + 2 + Math.floor(Math.random() * 6); // fin entre 2 y 8 horas después
        
        const startStr = `2026-${month}-${day.toString().padStart(2, '0')}T${startHour.toString().padStart(2, '0')}:00:00.000Z`;
        const endStr = `2026-${month}-${day.toString().padStart(2, '0')}T${endHour.toString().padStart(2, '0')}:00:00.000Z`;
        
        const typeEventId = Math.random() > 0.2 ? 2 : 1; // 80% plan de trabajo, 20% inasistencia
        const descBase = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        await client.query(
          'INSERT INTO "workplans" ("userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, \'active\', NOW(), NOW())',
          [user.id, typeEventId, startStr, endStr, `${descBase} (Simulado #${i+1})`]
        );
        insertedCount++;
      }
    }

    // 3. Resetear secuencia de IDs
    await client.query('SELECT setval(pg_get_serial_sequence(\'"workplans"\', \'id\'), coalesce(max(id), 1)) FROM "workplans"');
    console.log(`\nSuccessfully inserted ${insertedCount} simulated workplans!`);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
