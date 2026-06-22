# Manual de Usuario - Módulo de Registros

## 1. Descripción General

El módulo de **Registros** permite administrar los datos maestros del sistema: usuarios del sistema y paneles (médicos, instituciones, etc.). Este módulo es fundamental para el correcto funcionamiento de las demás funcionalidades.

### Acceso al Módulo

1. En el menú lateral, haga clic en **"Registros"**
2. Seleccione: Usuarios o Paneles

---

## 2. Gestión de Usuarios

### 2.1 Descripción

El submódulo de **Usuarios** permite administrar las cuentas de los usuarios que acceden al sistema, sus roles, permisos y asignaciones.

### 2.2 Acceder a Usuarios

**Ruta**: `Registros > Usuarios`

**URL**: `/records/users`

### 2.3 Lista de Usuarios

La tabla muestra todos los usuarios registrados:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único |
| **Nombre** | Nombre completo del usuario |
| **Email** | Correo electrónico |
| **Clasificación** | Rol o tipo de usuario |
| **Región** | Zona asignada |
| **Estado** | Activo/Inactivo |
| **Acciones** | Ver, Editar, Eliminar |

### 2.4 Buscar Usuarios

1. Use la **barra de búsqueda** en la parte superior
2. Puede buscar por nombre, email o identificación
3. Los resultados se filtran en tiempo real

### 2.5 Crear Nuevo Usuario

#### Paso 1: Iniciar Creación

1. Haga clic en **"+ Nuevo Usuario"**
2. Se abrirá el formulario de registro

#### Paso 2: Información Personal (Pestaña 1)

Complete los siguientes campos:

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| **Nombre** | Nombre completo | ✅ Sí |
| **Identificación** | Documento de identidad | ✅ Sí |
| **Email** | Correo electrónico | ✅ Sí |
| **Teléfono** | Número de contacto | ❌ No |
| **Clasificación** | Tipo/Rol del usuario | ✅ Sí |
| **Región** | Zona geográfica asignada | ✅ Sí |

#### Paso 3: Información Adicional (Pestaña 2)

| Campo | Descripción |
|-------|-------------|
| **Dirección** | Dirección física |
| **Ciudad** | Ciudad de residencia |
| **Supervisor** | Usuario supervisor asignado |
| **Fecha de ingreso** | Fecha de inicio en el sistema |

#### Paso 4: Portafolios (Pestaña 3)

Asigne los paneles que el usuario gestionará:

1. Haga clic en **"Agregar Panel"**
2. Busque y seleccione los paneles
3. Los paneles seleccionados aparecerán en la lista

#### Paso 5: Guardar

1. Verifique toda la información
2. Haga clic en **"Guardar"**
3. El usuario recibirá un correo con sus credenciales de acceso

### 2.6 Editar Usuario

1. Localice el usuario en el listado
2. Haga clic en el icono de **edición** (✏️)
3. Navegue entre las pestañas para modificar:
   - Información Personal
   - Información Adicional
   - Portafolios
4. Haga clic en **"Guardar"**

### 2.7 Ver Detalles de Usuario

1. Haga clic en el nombre del usuario
2. Se mostrará la ficha completa con todas las pestañas
3. Podrá ver:
   - Datos personales
   - Paneles asignados
   - Historial de actividad

### 2.8 Desactivar/Activar Usuario

1. Acceda a la edición del usuario
2. Cambie el estado de **"Activo"** a **"Inactivo"** o viceversa
3. Guarde los cambios

> ⚠️ **Nota**: Los usuarios inactivos no pueden acceder al sistema.

---

## 3. Clasificaciones de Usuario

### 3.1 Descripción

Las **Clasificaciones** definen los tipos o roles de usuarios en el sistema (Administrador, Supervisor, Representante, etc.).

### 3.2 Acceder a Clasificaciones

**Ruta**: `Registros > Usuarios > Clasificaciones`

**URL**: `/records/users/user-classifications`

### 3.3 Lista de Clasificaciones

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único |
| **Nombre** | Nombre de la clasificación |
| **Descripción** | Detalle del rol |
| **Permisos** | Nivel de acceso |
| **Estado** | Activo/Inactivo |

### 3.4 Crear Nueva Clasificación

1. Haga clic en **"+ Nueva Clasificación"**
2. Complete:
   - Nombre de la clasificación
   - Descripción
   - Permisos asociados
3. Haga clic en **"Guardar"**

### 3.5 Editar Clasificación

1. Localice la clasificación
2. Haga clic en editar
3. Modifique los campos necesarios
4. Guarde los cambios

---

## 4. Gestión de Paneles

### 4.1 Descripción

El submódulo de **Paneles** (también llamados "Thirds" o "Terceros") permite administrar la información de médicos, instituciones y otros contactos que son visitados por los usuarios del sistema.

### 4.2 Acceder a Paneles

**Ruta**: `Registros > Paneles`

**URL**: `/records/thirds`

### 4.3 Lista de Paneles

La tabla muestra todos los paneles registrados:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único |
| **Nombre** | Nombre del panel |
| **Identificación** | Documento/NIT |
| **Tipo** | Médico, Institución, etc. |
| **Especialidad** | Especialidad médica |
| **Región** | Zona geográfica |
| **Estado** | Activo/Inactivo |
| **Acciones** | Ver, Editar, Eliminar |

### 4.4 Buscar Paneles

1. Use la **barra de búsqueda**
2. Puede buscar por:
   - Nombre
   - Identificación
   - Especialidad
   - Región
3. Use los **filtros avanzados** para búsquedas más específicas

### 4.5 Crear Nuevo Panel

#### Paso 1: Iniciar Creación

1. Haga clic en **"+ Nuevo Panel"**
2. Se abrirá el formulario con múltiples pestañas

#### Paso 2: Información Personal (Pestaña 1)

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| **Nombre** | Nombre completo | ✅ Sí (mín. 5 caracteres) |
| **Identificación** | Documento/NIT | ✅ Sí (5-15 caracteres) |
| **Tipo** | Tipo de panel | ✅ Sí |
| **Clasificación** | Categoría del panel | ❌ No |
| **Especialidad** | Especialidad médica | ❌ No |
| **Sub-especialidad** | Sub-especialidad | ❌ No |
| **Región** | Zona geográfica | ❌ No |

#### Paso 3: Información de Contacto (Pestaña 2)

| Campo | Descripción |
|-------|-------------|
| **Teléfono** | Número principal |
| **Teléfono secundario** | Número alternativo |
| **Email** | Correo electrónico |
| **Dirección** | Dirección física |
| **Ciudad** | Ciudad |
| **Departamento** | Departamento/Estado |

#### Paso 4: Información Adicional (Pestaña 3)

| Campo | Descripción |
|-------|-------------|
| **Notas** | Observaciones generales |
| **Horario de atención** | Días y horas disponibles |
| **Preferencias** | Preferencias de contacto |
| **Fecha de registro** | Fecha de creación |

#### Paso 5: Portafolio (Pestaña 4)

Gestione los productos o servicios asociados al panel:

1. Haga clic en **"Agregar Producto"**
2. Seleccione los productos del catálogo
3. Configure cantidades o preferencias si aplica

#### Paso 6: Guardar

1. Verifique la información en todas las pestañas
2. Haga clic en **"Guardar"**
3. El panel quedará disponible para asignar a usuarios

### 4.6 Editar Panel

1. Localice el panel en el listado
2. Haga clic en el nombre o icono de edición
3. Navegue entre las 4 pestañas:
   - Información Personal
   - Información de Contacto
   - Información Adicional
   - Portafolio
4. Modifique los campos necesarios
5. Haga clic en **"Guardar"**

### 4.7 Ver Detalles del Panel

1. Haga clic en el nombre del panel
2. Se mostrará la ficha completa
3. Desde aquí puede:
   - Ver toda la información
   - Crear una nueva visita
   - Ver historial de visitas
   - Editar el panel

### 4.8 Crear Visita desde Panel

1. Acceda al detalle del panel
2. Haga clic en **"Nueva Visita"**
3. El panel se preseleccionará automáticamente
4. Complete los demás campos de la visita
5. Guarde

### 4.9 Eliminar Panel

1. Localice el panel
2. Haga clic en el icono de eliminar (🗑️)
3. Confirme la eliminación

> ⚠️ **Advertencia**: No puede eliminar paneles que tengan visitas o justificaciones asociadas. Primero debe eliminar o reasignar esos registros.

---

## 5. Tipos de Panel

### 5.1 Descripción

Los **Tipos de Panel** categorizan los diferentes tipos de contactos en el sistema.

### 5.2 Tipos Comunes

| Tipo | Descripción |
|------|-------------|
| **Médico** | Profesionales de la salud individuales |
| **Institución** | Hospitales, clínicas, centros médicos |
| **Farmacia** | Establecimientos farmacéuticos |
| **Distribuidor** | Distribuidores de productos |

---

## 6. Especialidades y Sub-especialidades

### 6.1 Especialidades

Las especialidades médicas permiten clasificar a los paneles según su área de práctica:

- Oftalmología
- Optometría
- Medicina General
- Pediatría
- Etc.

### 6.2 Sub-especialidades

Permiten una clasificación más detallada dentro de cada especialidad:

- Oftalmología > Retina
- Oftalmología > Glaucoma
- Oftalmología > Córnea
- Etc.

---

## 7. Regiones

### 7.1 Descripción

Las **Regiones** definen las zonas geográficas para organizar usuarios y paneles.

### 7.2 Uso de Regiones

- Asignar usuarios a zonas específicas
- Filtrar paneles por ubicación
- Generar reportes por región
- Definir territorios de trabajo

---

## 8. Importación y Exportación de Datos

### 8.1 Exportar Datos

1. Acceda al listado (Usuarios o Paneles)
2. Aplique los filtros deseados
3. Haga clic en **"Exportar"** o icono de descarga
4. Seleccione el formato (Excel)
5. El archivo se descargará automáticamente

### 8.2 Importar Datos

> ⚠️ **Nota**: La importación masiva puede requerir permisos de administrador.

1. Prepare el archivo Excel con el formato requerido
2. Acceda a la opción de **"Importar"**
3. Seleccione el archivo
4. Revise la vista previa de datos
5. Confirme la importación

---

## 9. Validaciones del Sistema

### 9.1 Validaciones de Usuario

| Campo | Validación |
|-------|------------|
| Nombre | Mínimo 5 caracteres |
| Identificación | 5-15 caracteres |
| Email | Formato válido de correo |

### 9.2 Validaciones de Panel

| Campo | Validación |
|-------|------------|
| Nombre | Mínimo 5 caracteres |
| Identificación | 5-15 caracteres |
| Tipo | Obligatorio |

### 9.3 Mensajes de Error

| Mensaje | Solución |
|---------|----------|
| "El nombre debe tener al menos 5 caracteres" | Ingrese un nombre más largo |
| "La identificación es requerida" | Complete el campo de identificación |
| "El panel no se encuentra disponible" | El panel fue eliminado o no existe |
| "El usuario no se encuentra disponible" | El usuario fue eliminado o no existe |

---

## 10. Consejos y Mejores Prácticas

### Para Usuarios

1. **Mantenga los datos actualizados** - Revise periódicamente la información
2. **Asigne clasificaciones correctas** - Facilita la gestión de permisos
3. **Defina supervisores** - Mejora el flujo de aprobaciones
4. **Revise portafolios** - Asegure que los paneles estén bien asignados

### Para Paneles

1. **Complete toda la información** - Facilita el contacto y seguimiento
2. **Use clasificaciones consistentes** - Mejora los reportes
3. **Actualice datos de contacto** - Evite información obsoleta
4. **Registre preferencias** - Mejora la calidad de las visitas

---

*Anterior: [Módulo de Consultas](./03-consultas.md) | Siguiente: [Manual Técnico](../manual-tecnico/01-arquitectura.md)*
