# Tecnologías y Metodologías

Documentación técnica del stack tecnológico y metodologías implementadas en API Ophtha Kaizen.

---

## Stack Tecnológico

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 16.x | Runtime de JavaScript del lado del servidor |
| **Express.js** | 4.18 | Framework web minimalista para APIs REST |
| **Sequelize** | 6.32 | ORM para interacción con base de datos |
| **MySQL** | 8.0 | Sistema de gestión de base de datos relacional |

### Seguridad

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **JWT** | 9.0 | Autenticación stateless con tokens |
| **bcryptjs** | 2.4 | Hash de contraseñas con salt |
| **Helmet** | 5.1 | Headers HTTP de seguridad |
| **CORS** | 2.8 | Control de acceso cross-origin |

### Utilidades

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Moment.js** | 2.30 | Manipulación de fechas y zonas horarias |
| **Multer** | 1.4 | Manejo de uploads de archivos |
| **Nodemailer** | 6.9 | Envío de correos electrónicos |
| **Morgan** | 1.10 | Logging de requests HTTP |
| **dotenv** | 16.0 | Variables de entorno |

### Desarrollo

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Nodemon** | 3.0 | Hot reload en desarrollo |
| **Jest** | 28.1 | Framework de testing |
| **Supertest** | 6.2 | Testing de endpoints HTTP |
| **cross-env** | 7.0 | Variables de entorno cross-platform |

---

## Arquitectura

### Patrón de Diseño: MVC + Services

```
┌─────────────────────────────────────────────────────────────┐
│                        REQUEST                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MIDDLEWARES                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Helmet    │  │    CORS     │  │   Auth (JWT)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        ROUTES                                │
│         Define endpoints y asocia con controllers            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      CONTROLLERS                             │
│    Maneja request/response, validación, DTOs                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVICES                               │
│         Lógica de negocio, transacciones, reglas             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        MODELS                                │
│              Definición de entidades (Sequelize)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                              │
│                         MySQL                                │
└─────────────────────────────────────────────────────────────┘
```

### Responsabilidades por Capa

#### Routes
- Definir endpoints HTTP (GET, POST, PUT, DELETE)
- Aplicar middlewares de autenticación
- Delegar a controllers

```javascript
router.get('/', authMiddleware, controller.getAll);
router.post('/', authMiddleware, controller.create);
```

#### Controllers
- Recibir y validar requests
- Transformar datos con DTOs
- Manejar respuestas HTTP
- Delegar lógica a services

```javascript
const create = async (req, res) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(new SuccessResponseDTO(result));
  } catch (error) {
    res.status(400).json(new ErrorResponseDTO(error.message));
  }
};
```

#### Services
- Implementar lógica de negocio
- Manejar transacciones
- Coordinar entre múltiples models
- Aplicar reglas de negocio

```javascript
const createVisit = async (visitData, userId) => {
  return await withTransaction(async (transaction) => {
    // Validar portafolio
    // Crear visita
    // Crear evento calendario
    // Retornar resultado
  });
};
```

#### Models
- Definir estructura de datos
- Configurar relaciones
- Implementar hooks y validaciones

```javascript
const User = sequelize.define('user', {
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING }
}, {
  paranoid: true // Soft delete
});
```

---

## Metodologías Implementadas

### 1. RESTful API Design

Diseño de API siguiendo principios REST:

| Método | Endpoint | Acción |
|--------|----------|--------|
| GET | `/api/resources` | Listar recursos |
| GET | `/api/resources/:id` | Obtener recurso |
| POST | `/api/resources` | Crear recurso |
| PUT | `/api/resources/:id` | Actualizar recurso |
| DELETE | `/api/resources/:id` | Eliminar recurso |

**Códigos de respuesta:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### 2. Soft Delete

Eliminación lógica en lugar de física:

```javascript
// Configuración en modelo
{
  paranoid: true,
  timestamps: true
}

// Al eliminar, Sequelize automáticamente:
// - Establece deletedAt = NOW()
// - Excluye registros con deletedAt != null en consultas
```

**Beneficios:**
- Recuperación de datos eliminados
- Auditoría completa
- Integridad referencial

### 3. Transaction Management

Uso de transacciones para operaciones atómicas:

```javascript
const withTransaction = async (callback) => {
  const transaction = await sequelize.transaction();
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
```

### 4. DTO Pattern (Data Transfer Objects)

Estandarización de respuestas:

```javascript
// Respuesta exitosa
class SuccessResponseDTO {
  constructor(data, message = 'Operación exitosa') {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

// Respuesta de error
class ErrorResponseDTO {
  constructor(message, errors = null) {
    this.success = false;
    this.message = message;
    this.errors = errors;
  }
}
```

### 5. JWT Authentication

Autenticación stateless con tokens:

```
┌──────────┐     1. Login      ┌──────────┐
│  Client  │ ───────────────▶  │  Server  │
└──────────┘                   └──────────┘
     │                              │
     │     2. JWT Token             │
     │ ◀─────────────────────────── │
     │                              │
     │  3. Request + Bearer Token   │
     │ ────────────────────────────▶│
     │                              │
     │     4. Protected Resource    │
     │ ◀─────────────────────────── │
```

**Estructura del Token:**
```javascript
{
  header: { alg: 'HS256', typ: 'JWT' },
  payload: { userId: 1, rol: 'Administrador', exp: 1234567890 },
  signature: 'hash'
}
```

### 6. Environment-based Configuration

Configuración por entorno:

```
.env.dev      → Desarrollo local
.env.prod     → Producción
```

```javascript
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.prod' });
} else {
  dotenv.config({ path: './.env.dev' });
}
```

### 7. Logging Strategy

Niveles de logging con Morgan:

| Entorno | Formato | Información |
|---------|---------|-------------|
| Development | `dev` | Método, URL, Status, Tiempo |
| Production | `combined` | IP, User-Agent, Referrer, etc. |

```javascript
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
```

---

## Patrones de Código

### 1. Async/Await

Manejo asíncrono moderno:

```javascript
const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('Error al obtener usuarios');
  }
};
```

### 2. Error Handling Centralizado

```javascript
// En controller
try {
  const result = await service.operation();
  res.json(new SuccessResponseDTO(result));
} catch (error) {
  logger.error('Error:', error);
  res.status(error.statusCode || 500)
     .json(new ErrorResponseDTO(error.message));
}
```

### 3. Query Builder con Sequelize

```javascript
// Consultas complejas
const results = await Model.findAll({
  where: {
    status: 'active',
    createdAt: { [Op.gte]: startDate }
  },
  include: [{ model: Related, required: true }],
  order: [['createdAt', 'DESC']],
  limit: 10
});
```

### 4. Raw Queries para Reportes

```javascript
// Consultas SQL optimizadas para reportes complejos
const results = await sequelize.query(`
  SELECT u.name, COUNT(v.id) as visits
  FROM users u
  LEFT JOIN visits v ON u.id = v.userId
  WHERE v.date BETWEEN ? AND ?
  GROUP BY u.id
`, {
  replacements: [startDate, endDate],
  type: QueryTypes.SELECT
});
```

---

## Seguridad

### Headers HTTP (Helmet)

```javascript
app.use(helmet());
// Configura automáticamente:
// - Content-Security-Policy
// - X-Content-Type-Options
// - X-Frame-Options
// - X-XSS-Protection
// - Strict-Transport-Security
```

### Password Hashing

```javascript
// Hash con bcrypt (salt rounds: 10)
const hashedPassword = await bcrypt.hash(password, 10);

// Verificación
const isValid = await bcrypt.compare(password, hashedPassword);
```

### CORS Configuration

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://app.domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

## Convenciones de Código

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Variables | camelCase | `userId`, `firstName` |
| Constantes | UPPER_SNAKE | `MAX_RETRIES`, `API_URL` |
| Funciones | camelCase | `getUsers()`, `createVisit()` |
| Clases | PascalCase | `UserService`, `VisitController` |
| Archivos | kebab-case | `user.controller.js`, `visit.service.js` |
| Tablas DB | snake_case | `users`, `thirds_portfolios` |

### Estructura de Archivos

```
src/
├── controllers/
│   └── [entity].controller.js
├── services/
│   └── [entity].service.js
├── models/
│   └── [Entity].js
├── routes/
│   └── [entity].routes.js
├── middlewares/
│   └── [name].middleware.js
└── utils/
    └── [utility].js
```

---

## Testing

### Unit Tests con Jest

```javascript
describe('UserService', () => {
  it('should create a user', async () => {
    const user = await userService.create({
      email: 'test@test.com',
      password: 'password123'
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test@test.com');
  });
});
```

### Integration Tests con Supertest

```javascript
describe('GET /api/users', () => {
  it('should return all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Despliegue

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4001
CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "4001:4001"
    environment:
      - NODE_ENV=production
    depends_on:
      - mysql
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
```

---

## Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
