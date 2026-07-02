const { Client } = require('pg');

async function run() {
  const client = new Client({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'kaizenophtha_db'
  });
  await client.connect();

  try {
    // 1. Obtener los thirds asignados al portafolio 13
    const ids = [4, 12, 15, 33, 55, 61, 62, 74, 81, 120, 18, 151, 102, 118, 163];
    
    const res = await client.query(
      'SELECT id, name, status, "deletedAt" FROM "third" WHERE id = ANY($1)',
      [ids]
    );

    console.log('=== ESTADO DE LOS TERCEROS EN LA BASE DE DATOS ===');
    console.log(res.rows);

  } finally {
    await client.end();
  }
}

run().catch(console.error);
