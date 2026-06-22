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
        await dbConection.sync({ alter: false });
        console.log('Modelos sincronizados con la base de datos');
        
        // Iniciar el servidor HTTP
        app.listen(PORT, () => {
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
