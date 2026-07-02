import app from './src/app';
import dbConection, { testConnection } from './src/database';
import { PORT } from './src/config';

// Función principal para iniciar el servidor
const startServer = async () => {
    try {
        // Verificar la conexión a la base de datos
        const isConnected = await testConnection();
        
        if (!isConnected) {
            console.error('No se pudo iniciar el servidor debido a problemas con la base de datos');
            process.exit(1);
        }
        
        // Sincronización de todos los modelos con la base de datos
        await dbConection.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos');
        
        // Ejecutar migración de categorías si es necesario
        const { migrateCategories } = await import('./src/utils/migrateCategories');
        await migrateCategories();

        
        // Iniciar el servidor HTTP
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
            // Iniciar planificador de tareas en segundo plano (Scheduler)
            import('./src/services/scheduler.service').then(({ startScheduler }) => {
                startScheduler();
            }).catch(err => {
                console.error('Error al iniciar el planificador de tareas:', err);
            });
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();

// ==========================================
// CAZADOR DE ERRORES DE PROCESOS (PROMESAS ROTAS Y CRASHES)
// ==========================================
process.on('unhandledRejection', (reason, promise) => {
    console.error('\n💥 [PROMESA RECHAZADA Y NO MANEJADA] 💥');
    console.error('Razón:', reason);
    console.error('======================================\n');
});

process.on('uncaughtException', (error) => {
    console.error('\n🔥 [EXCEPCIÓN NO CAPTURADA] 🔥');
    console.error('Error:', error);
    console.error('======================================\n');
});
