const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env.dev' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.MYSQLDB_USER || 'postgres',
  password: process.env.MYSQLDB_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'kaizenophtha_db',
});

async function main() {
  await client.connect();
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Cmdev2023*', salt);
  
  // 1. Obtener todos los usuarios
  const resUsers = await client.query('SELECT id, email, "firstName", "lastName", status FROM "users" ORDER BY id ASC');
  
  console.log(`\n🔄 Actualizando contraseñas para ${resUsers.rows.length} usuarios...`);
  
  // 2. Actualizar contraseña de cada usuario
  for (const user of resUsers.rows) {
    await client.query('UPDATE "users" SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    console.log(`✅ Contraseña actualizada para: ${user.email} (${user.firstName} ${user.lastName}) [Estado: ${user.status}]`);
  }
  
  console.log('\n📋 LISTADO DE USUARIOS PARA ACCEDER:');
  console.log('====================================');
  resUsers.rows.forEach(user => {
    console.log(`👤 Nombre: ${user.firstName} ${user.lastName}`);
    console.log(`   Email:  ${user.email}`);
    console.log(`   Estado: ${user.status}`);
    console.log('------------------------------------');
  });

  await client.end();
}

main().catch(console.error);
