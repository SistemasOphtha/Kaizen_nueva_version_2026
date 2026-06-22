/**
 * Script de migración para agregar columna deletedAt a todas las tablas
 * para implementar soft delete (eliminación lógica)
 * 
 * Ejecutar con: node src/scripts/add-soft-delete-columns.js
 */

const dbConection = require('../database.js');

const tables = [
  'users',
  'third',
  'visits',
  'workplans',
  'justifications',
  'portfolios',
  'thirds_portfolios',
  'region',
  'user_classification',
  'third_classification',
  'third_specialty',
  'third_subspecialty',
  'third_type',
  'type_events',
  'calendar_events',
  'calendar_labels',
  'notifications',
  'configs'
];

async function addSoftDeleteColumns() {
  try {
    console.log('Iniciando migración para agregar columnas deletedAt...\n');
    
    for (const table of tables) {
      try {
        // Verificar si la columna ya existe
        const [columns] = await dbConection.query(
          `SHOW COLUMNS FROM \`${table}\` LIKE 'deletedAt'`
        );
        
        if (columns.length > 0) {
          console.log(`✓ Tabla '${table}': columna deletedAt ya existe`);
          continue;
        }
        
        // Agregar la columna deletedAt
        await dbConection.query(
          `ALTER TABLE \`${table}\` ADD COLUMN \`deletedAt\` DATETIME NULL DEFAULT NULL`
        );
        
        console.log(`✓ Tabla '${table}': columna deletedAt agregada exitosamente`);
      } catch (error) {
        if (error.original && error.original.code === 'ER_NO_SUCH_TABLE') {
          console.log(`⚠ Tabla '${table}': no existe en la base de datos`);
        } else {
          console.error(`✗ Tabla '${table}': error - ${error.message}`);
        }
      }
    }
    
    console.log('\n✓ Migración completada exitosamente');
    console.log('\nNota: Con paranoid: true en los modelos de Sequelize:');
    console.log('  - destroy() marcará registros con deletedAt en lugar de eliminarlos');
    console.log('  - findAll(), findOne(), etc. excluirán automáticamente registros eliminados');
    console.log('  - Para incluir registros eliminados, usar { paranoid: false }');
    console.log('  - Para restaurar un registro: Model.restore({ where: { id } })');
    
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    await dbConection.close();
    process.exit(0);
  }
}

addSoftDeleteColumns();
