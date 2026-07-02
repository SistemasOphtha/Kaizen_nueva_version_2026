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
    // 1. Obtener todas las tablas
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log('=== REGISTROS POR TABLA EN LA BASE DE DATOS ===');

    for (const row of tables.rows) {
      const tableName = row.table_name;
      try {
        const countRes = await client.query(`SELECT COUNT(*) FROM "${tableName}"`);
        console.log(`Tabla: ${tableName.padEnd(25)} | Registros: ${countRes.rows[0].count}`);
      } catch (err) {
        console.log(`Tabla: ${tableName.padEnd(25)} | Error al consultar: ${err.message}`);
      }
    }
  } finally {
    await client.end();
  }
}

run().catch(console.error);
