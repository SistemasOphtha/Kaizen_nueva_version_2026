# Manual Técnico - Arquitectura y Configuración

## 1. Descripción General

Este documento describe la arquitectura técnica del sistema **Kaizen Ophtha**, incluyendo las tecnologías utilizadas, estructura del proyecto y configuraciones necesarias.

---

## 2. Stack Tecnológico

### 2.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Framework principal de UI |
| **TypeScript** | 5.x | Tipado estático |
| **Redux Toolkit** | Latest | Gestión de estado global |
| **React Router** | 6.x | Enrutamiento SPA |
| **Material UI (MUI)** | 5.x | Componentes de UI |
| **Fuse React** | 9.x | Template y componentes base |
| **React Hook Form** | 7.x | Manejo de formularios |
| **Yup** | Latest | Validación de esquemas |
| **Framer Motion** | Latest | Animaciones |
| **Axios** | Latest | Cliente HTTP |
| **i18next** | Latest | Internacionalización |

### 2.2 Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **Node.js** | Runtime (v20.x recomendado) |
| **npm/yarn** | Gestión de paquetes |
| **ESLint** | Linting de código |
| **Prettier** | Formateo de código |

---

## 3. Estructura del Proyecto

```
kaizen3.0/
├── public/                    # Archivos estáticos
│   ├── assets/               # Imágenes y recursos
│   └── index.html            # HTML principal
├── src/
│   ├── @fuse/                # Componentes Fuse (template)
│   ├── @history/             # Utilidades de historial
│   ├── @lodash/              # Utilidades Lodash
│   ├── @mock-api/            # API mock para desarrollo
│   ├── app/
│   │   ├── auth/             # Autenticación
│   │   ├── configs/          # Configuraciones globales
│   │   ├── main/             # Módulos principales
│   │   │   ├── apps/         # Aplicaciones (Visitas, Justificaciones)
│   │   │   ├── dashboards/   # Tableros
│   │   │   ├── records/      # Registros (Usuarios, Paneles)
│   │   │   └── settings/     # Configuraciones
│   │   ├── shared-components/# Componentes compartidos
│   │   ├── store/            # Store Redux global
│   │   └── theme-layouts/    # Layouts del tema
│   ├── styles/               # Estilos globales
│   └── index.tsx             # Punto de entrada
├── docs/                     # Documentación
├── .env                      # Variables de entorno
└── package.json              # Dependencias
```

---

## 4. Arquitectura de Módulos

### 4.1 Patrón de Módulos

Cada módulo sigue una estructura consistente:

```
module/
├── ModuleApp.tsx             # Componente contenedor
├── ModuleAppConfig.tsx       # Configuración de rutas
├── Module/                   # Componente individual
│   ├── Module.tsx           # Vista principal
│   ├── ModuleHeader.tsx     # Encabezado
│   └── tabs/                # Pestañas del formulario
├── Modules/                  # Lista de elementos
│   ├── Modules.tsx          # Vista de lista
│   ├── ModulesHeader.tsx    # Encabezado de lista
│   └── ModulesTable.tsx     # Tabla de datos
├── i18n/                     # Traducciones
│   ├── en.ts
│   └── es.ts
├── models/                   # Modelos de datos
├── store/                    # Slices de Redux
│   ├── moduleSlice.ts       # Slice individual
│   └── modulesSlice.ts      # Slice de lista
└── types/                    # Tipos TypeScript
```

### 4.2 Módulos Principales

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| **Dashboards** | `/dashboards/*` | Tableros e indicadores |
| **Apps** | `/apps/*` | Visitas, Justificaciones, Calendario |
| **Records** | `/records/*` | Usuarios, Paneles |
| **Settings** | `/settings/*` | Configuraciones |

---

## 5. Gestión de Estado (Redux)

### 5.1 Estructura del Store

```typescript
// app/store/index.ts
const store = configureStore({
  reducer: {
    fuse: fuseReducer,        // Estado del tema
    user: userReducer,        // Usuario autenticado
    // Módulos dinámicos se inyectan según necesidad
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* middlewares */),
});
```

### 5.2 Slices por Módulo

Cada módulo tiene sus propios slices:

```typescript
// Ejemplo: store/visitSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getVisit = createAsyncThunk(
  'visit/getVisit',
  async (visitId: string) => {
    const response = await axios.get(`/api/visits/${visitId}`);
    return response.data;
  }
);

const visitSlice = createSlice({
  name: 'visit',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetVisit: (state) => {
      state.data = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVisit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVisit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      });
  },
});
```

---

## 6. Autenticación

### 6.1 Flujo de Autenticación

```
1. Usuario ingresa credenciales
2. Frontend envía POST /api/auth/login
3. Backend valida y retorna JWT
4. Frontend almacena token en localStorage
5. Token se incluye en headers de requests
6. Backend valida token en cada request
```

### 6.2 JWT Service

```typescript
// app/auth/services/jwtService.ts
class JwtService {
  init() {
    this.handleAuthentication();
  }

  handleAuthentication() {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit('onNoAccessToken');
      return;
    }
    if (this.isAuthTokenValid(access_token)) {
      this.emit('onAutoLogin');
    } else {
      this.emit('onAutoLogout', 'Token expirado');
    }
  }

  signInWithToken() {
    return axios.get('/api/auth/user');
  }
}
```

### 6.3 Protección de Rutas

```typescript
// Rutas protegidas requieren autenticación
{
  path: '/apps/visits',
  element: <VisitApp />,
  auth: ['admin', 'user'], // Roles permitidos
}
```

---

## 7. Configuración de Rutas

### 7.1 Configuración Principal

```typescript
// app/configs/routesConfig.tsx
const routesConfig: FuseRouteConfigsType = [
  ...dashboardsConfigs,
  ...appsConfigs,
  ...recordsConfigs,
  ...settingsConfigs,
  SignInConfig,
  SignOutConfig,
  Error404Config,
];
```

### 7.2 Configuración de Módulo

```typescript
// apps/visit/VisitAppConfig.tsx
const VisitAppConfig: FuseRouteConfigType = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/visits',
      element: <VisitApp />,
      children: [
        {
          path: '',
          element: <Visits />,
        },
        {
          path: ':visitId',
          element: <Visit />,
        },
        {
          path: ':visitId/:thirdId',
          element: <Visit />,
        },
      ],
    },
  ],
};
```

---

## 8. Navegación

### 8.1 Configuración del Menú

```typescript
// app/configs/navigationConfig.ts
const navigationConfig: FuseNavigationType = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    translate: 'DASHBOARDS',
    type: 'group',
    icon: 'heroicons-outline:chart-pie',
    children: [
      {
        id: 'indicators-component',
        title: 'Indicators',
        translate: 'INDICATORS',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/dashboards/indicators',
      },
      // ... más items
    ],
  },
  // ... más grupos
];
```

### 8.2 Internacionalización

```typescript
// app/configs/navigation-i18n/es.ts
const locale = {
  APPLICATIONS: 'Consultas',
  DASHBOARDS: 'Tableros',
  VISITS: 'Visitas',
  JUSTIFICATIONS: 'Justificaciones',
  USERS: 'Usuarios',
  THIRDS: 'Paneles',
  // ...
};
```

---

## 9. Formularios y Validación

### 9.1 React Hook Form + Yup

```typescript
// Ejemplo de validación
const schema = yup.object().shape({
  typeId: yup.number().required('El tipo de panel es requerido'),
  thirdId: yup.number().required('El panel es requerido'),
  date: yup.string().required('La fecha de la visita es requerida'),
  objective: yup.string().required('El objetivo de la visita es requerido'),
});

// Uso en componente
const methods = useForm({
  mode: 'onChange',
  defaultValues: {},
  resolver: yupResolver(schema),
});
```

### 9.2 Componentes de Formulario

```typescript
// Uso de FormProvider
<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)}>
    <Controller
      name="typeId"
      control={methods.control}
      render={({ field }) => (
        <TextField {...field} label="Tipo" error={!!errors.typeId} />
      )}
    />
  </form>
</FormProvider>
```

---

## 10. API y Servicios

### 10.1 Configuración de Axios

```typescript
// Interceptor para agregar token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 10.2 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/user` | Obtener usuario actual |
| GET | `/api/visits` | Listar visitas |
| POST | `/api/visits` | Crear visita |
| GET | `/api/visits/:id` | Obtener visita |
| PUT | `/api/visits/:id` | Actualizar visita |
| DELETE | `/api/visits/:id` | Eliminar visita |
| GET | `/api/thirds` | Listar paneles |
| GET | `/api/users` | Listar usuarios |

---

## 11. Variables de Entorno

### 11.1 Archivo .env

```bash
# API
REACT_APP_API_URL=http://localhost:3001/api

# Configuración
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0

# Autenticación
REACT_APP_JWT_SECRET=your-secret-key
```

### 11.2 Uso en Código

```typescript
const API_URL = process.env.REACT_APP_API_URL;
```

---

## 12. Instalación y Ejecución

### 12.1 Requisitos

- Node.js v20.x o superior
- npm v9.x o yarn v1.22.x

### 12.2 Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd kaizen3.0

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con valores apropiados
```

### 12.3 Ejecución

```bash
# Desarrollo
npm start

# Producción (build)
npm run build

# Tests
npm run test
```

---

## 13. Despliegue

### 13.1 Build de Producción

```bash
npm run build
```

Genera la carpeta `build/` con archivos optimizados.

### 13.2 Configuración de Servidor

Para SPA, configurar redirección a `index.html`:

```nginx
# Nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 14. Solución de Problemas

### 14.1 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Module not found` | Dependencia faltante | `npm install` |
| `CORS error` | API en diferente origen | Configurar CORS en backend |
| `401 Unauthorized` | Token inválido/expirado | Cerrar sesión y volver a iniciar |
| `Network Error` | API no disponible | Verificar que el backend esté corriendo |

### 14.2 Logs de Depuración

```typescript
// Habilitar logs de Redux
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
```

---

*Anterior: [Módulo de Registros](../manual-usuario/04-registros.md) | Siguiente: [Guía Rápida](../guia-rapida.md)*
