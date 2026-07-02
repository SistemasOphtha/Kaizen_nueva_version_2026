import dbConection from '../database';
import UserCategory from '../models/UserCategory';

export const migrateCategories = async () => {
    try {
        console.log('--- Iniciando migración de categorías ---');
        
        // 1. Asegurar que las categorías base existan
        const baseCategories = ['Junior', 'Senior', 'Comercial', 'Coordinador', 'Administrador'];
        
        for (const catName of baseCategories) {
            await UserCategory.findOrCreate({
                where: { name: catName },
                defaults: {
                    name: catName,
                    canCreate: catName === 'Administrador' || catName === 'Coordinador',
                    canRead: true,
                    canUpdate: catName === 'Administrador' || catName === 'Coordinador',
                    canDelete: catName === 'Administrador'
                }
            });
        }
        
        // 2. Obtener usuarios usando una consulta raw para leer el campo 'category' antiguo
        const [users]: any = await dbConection.query(`SELECT id, category FROM users WHERE "categoryId" IS NULL AND category IS NOT NULL;`);
        
        if (users && users.length > 0) {
            console.log(`Migrando ${users.length} usuarios a la nueva estructura de categoryId...`);
            
            for (const user of users) {
                if (user.category) {
                    const category = await UserCategory.findOne({ where: { name: user.category } });
                    if (category) {
                        await dbConection.query(`UPDATE users SET "categoryId" = ${category.dataValues.id} WHERE id = ${user.id};`);
                    }
                }
            }
            console.log('Migración de categorías de usuarios completada.');
        } else {
            console.log('No se requiere migración. Todos los usuarios tienen categoryId o no hay usuarios por migrar.');
        }
    } catch (error) {
        console.error('Error durante la migración de categorías:', error);
    }
};
