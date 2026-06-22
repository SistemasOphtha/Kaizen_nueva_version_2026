# API Ophtha Kaizen

Backend para el sistema de gestión de visitas médicas y seguimiento de impactos comerciales.

## Descripción

API RESTful desarrollada con Node.js y Express para gestionar representantes médicos, terceros (médicos, droguerías, comercios), visitas, portafolios y reportes de cumplimiento.

## Tecnologías

- **Runtime:** Node.js 16.x
- **Framework:** Express 4.18
- **Base de datos:** MySQL con Sequelize ORM
- **Autenticación:** JWT (jsonwebtoken)
- **Seguridad:** Helmet, bcryptjs
- **Otros:** Moment-timezone, Multer (uploads), Nodemailer

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.dev

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## Variables de Entorno

Crear archivo `.env.dev` o `.env.prod`:

```env
MYSQLDB_HOST=localhost
MYSQLDB_DATABASE=ophtha_db
MYSQLDB_USER=root
MYSQLDB_PASSWORD=password
DB_PORT=3306
NODE_LOCAL_PORT=4001
SECRET=jwt_secret_key
SECRET_REFRESH=jwt_refresh_secret
ADMIN_EMAIL=admin@example.com
ADMIN_FIRSTH_NAME=Admin
ADMIN_LAST_NAME=User
ADMIN_PASSWORD=password
```

## Estructura del Proyecto

```bash
src/
├── app.js              # Configuración de Express
├── config.js           # Variables de configuración
├── database.js         # Conexión a MySQL con Sequelize
├── controllers/        # Controladores de rutas
├── dtos/               # Data Transfer Objects
├── middlewares/        # Middlewares (auth, validación)
├── models/             # Modelos Sequelize
├── routes/             # Definición de rutas
├── services/           # Lógica de negocio
├── scripts/            # Scripts de migración y utilidades
└── utils/              # Utilidades (logger, helpers)
```

## Endpoints API

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/refresh` | Refrescar token |
| POST | `/api/auth/logout` | Cerrar sesión |

### Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Obtener usuario |
| POST | `/api/users` | Crear usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario (soft delete) |
| POST | `/api/users/bulk-delete` | Eliminación masiva |

### Terceros (Médicos/Droguerías/Comercios)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/thirds` | Listar terceros |
| GET | `/api/thirds/:id` | Obtener tercero |
| POST | `/api/thirds` | Crear tercero |
| PUT | `/api/thirds/:id` | Actualizar tercero |
| DELETE | `/api/thirds/:id` | Eliminar tercero (soft delete) |
| POST | `/api/thirds/bulk-delete` | Eliminación masiva |
| POST | `/api/thirds/assign` | Asignar tercero a portafolio |

### Visitas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/visits` | Listar visitas |
| GET | `/api/visits/:id` | Obtener visita |
| POST | `/api/visits` | Crear visita |
| PUT | `/api/visits/:id` | Actualizar visita |
| DELETE | `/api/visits/:id` | Eliminar visita (soft delete) |

### Portafolios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/portfolios` | Listar portafolios |
| GET | `/api/portfolios/:userId` | Obtener portafolio de usuario |
| POST | `/api/portfolios/assign` | Asignar tercero a portafolio |
| PUT | `/api/portfolios/approve/:id` | Aprobar tercero en portafolio |
| DELETE | `/api/portfolios/remove/:id` | Remover tercero de portafolio |

### Calendario
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/calendar` | Obtener eventos del calendario |
| POST | `/api/calendar` | Crear evento |
| PUT | `/api/calendar/:id` | Actualizar evento |
| DELETE | `/api/calendar/:id` | Eliminar evento |

### Plan de Trabajo (Workplan)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/workplans` | Listar planes de trabajo |
| POST | `/api/workplans` | Crear plan de trabajo |
| PUT | `/api/workplans/:id` | Actualizar plan |
| DELETE | `/api/workplans/:id` | Eliminar plan |

### Justificaciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/justifications` | Listar justificaciones |
| POST | `/api/justifications` | Crear justificación |
| PUT | `/api/justifications/:id` | Actualizar justificación |

### Widgets y Reportes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/widgets/tracking-alert` | Alertas de seguimiento |
| GET | `/api/widgets/impacts` | Widget de impactos |
| GET | `/api/widgets/reports` | Widget de reportes |
| POST | `/api/widgets/filter-impacts` | Filtrar impactos |
| GET | `/api/widgets/third-impacts-report` | Reporte de impactos por tercero |
| GET | `/api/widgets/report-impacts-by-user` | Reporte de impactos por usuario |

### Notificaciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/notifications` | Listar notificaciones |
| PUT | `/api/notifications/:id/read` | Marcar como leída |
| DELETE | `/api/notifications/:id` | Eliminar notificación |

### Configuración
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/configs` | Obtener configuraciones |
| PUT | `/api/configs/:name` | Actualizar configuración |

### Catálogos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/user-classifications` | Clasificaciones de usuario |
| GET | `/api/user-regions` | Regiones |
| GET | `/api/third-classifications` | Clasificaciones de terceros |
| GET | `/api/third-types` | Tipos de terceros |
| GET | `/api/third-specialtys` | Especialidades |
| GET | `/api/third-sub-specialtys` | Sub-especialidades |
| GET | `/api/type-events` | Tipos de eventos |

## Modelos de Datos

### Principales
- **User** - Usuarios del sistema (administradores, representantes)
- **Third** - Terceros (médicos, droguerías, comercios)
- **Visit** - Registro de visitas realizadas
- **Portfolio** - Portafolio de terceros asignados a usuarios
- **ThirdsPortfolio** - Relación tercero-portafolio con estado de aprobación

### Calendario y Planificación
- **CalendarEvent** - Eventos del calendario
- **CalendarLabel** - Etiquetas de eventos
- **Workplan** - Planes de trabajo y ausencias
- **TypeEvent** - Tipos de eventos

### Catálogos
- **Region** - Regiones geográficas
- **UserClassification** - Clasificaciones de usuarios
- **ThirdClassification** - Clasificaciones de terceros
- **ThirdType** - Tipos de terceros (Médico, Droguería, Comercial)
- **ThirdSpecialty** - Especialidades médicas
- **ThirdSubSpecialty** - Sub-especialidades

### Sistema
- **Notification** - Notificaciones del sistema
- **Justification** - Justificaciones de ausencias/incumplimientos
- **Config** - Configuraciones del sistema (días festivos, horas diarias)

## Características

### Soft Delete
Todos los modelos implementan eliminación lógica (`paranoid: true`). Los registros eliminados mantienen un timestamp en `deletedAt` y no aparecen en consultas normales.

### Notificaciones Automáticas
- Creación de nuevo panel
- Panel pendiente de aprobación
- Asignación de terceros a portafolio

### Eventos de Calendario
Las visitas crean automáticamente eventos en el calendario del usuario.

### Reportes de Impactos
- Gráfico mensual de impactos vs visitas (12 meses)
- Porcentaje de cumplimiento
- Reporte por usuario y región
- Cálculo de días laborables (excluye festivos y ausencias)

## Scripts de Utilidad

```bash
# Agregar columnas de soft delete a tablas existentes
node src/scripts/add-soft-delete-columns.js

# Inicializar configuración de días festivos
node src/scripts/init-holidays-config.js

# Actualizar esquema de configuración
node src/scripts/update-config-schema.js
```

## Autor

**JhordanARV** - Code Master Development

## Versión

0.0.2
