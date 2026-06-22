# Manual de Usuario - Módulo de Consultas (Aplicaciones)

## 1. Descripción General

El módulo de **Consultas** (también llamado Aplicaciones) es el núcleo operativo del sistema. Aquí se gestionan las actividades diarias como visitas, justificaciones y el calendario de actividades.

### Acceso al Módulo

1. En el menú lateral, haga clic en **"Consultas"**
2. Seleccione la opción deseada: Calendario, Visitas o Justificaciones

---

## 2. Calendario

### 2.1 Descripción

El **Calendario** proporciona una vista visual de todas las actividades programadas, visitas realizadas y eventos importantes.

### 2.2 Acceder al Calendario

**Ruta**: `Consultas > Calendario`

**URL**: `/apps/calendar`

### 2.3 Vistas del Calendario

| Vista | Descripción |
|-------|-------------|
| **Mes** | Vista mensual con todos los eventos |
| **Semana** | Vista semanal detallada |
| **Día** | Vista diaria con horarios |
| **Agenda** | Lista de eventos próximos |

### 2.4 Navegar en el Calendario

- **Cambiar mes/semana**: Use las flechas `<` `>` en la parte superior
- **Ir a hoy**: Haga clic en el botón **"Hoy"**
- **Cambiar vista**: Seleccione entre Mes, Semana, Día o Agenda

### 2.5 Eventos en el Calendario

Los eventos se muestran con colores según su tipo:

| Color | Tipo de Evento |
|-------|----------------|
| 🟢 Verde | Visita |
| 🔵 Azul | Cumpleaños |
| 🟡 Amarillo | Plan de trabajo |

### 2.6 Crear Evento desde el Calendario

Los eventos se crean automáticamente cuando se crean visitas, justificaciones o planes de trabajo.

### 2.7 Ver Detalles de un Evento

1. Haga clic sobre el evento en el calendario
2. Se abrirá un modal con los detalles
3. Desde ahí puede editar o ir al recurso asociado

---

## 3. Visitas

### 3.1 Descripción

El módulo de **Visitas** permite registrar, consultar y gestionar todas las visitas realizadas a los paneles.

### 3.2 Acceder a Visitas

**Ruta**: `Consultas > Visitas`

**URL**: `/apps/visits`

### 3.3 Lista de Visitas

Al acceder al módulo, verá una tabla con todas las visitas registradas:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único de la visita |
| **Panel** | Nombre del panel visitado |
| **Tipo** | Tipo de panel |
| **Fecha** | Fecha de la visita |
| **Objetivo** | Objetivo de la visita |
| **Estado** | Estado actual de la visita |
| **Acciones** | Botones para ver/editar/eliminar |

### 3.4 Buscar Visitas

1. Use la **barra de búsqueda** en la parte superior
2. Escriba el nombre del panel, fecha u otro criterio
3. Los resultados se filtrarán automáticamente

### 3.5 Crear Nueva Visita

#### Paso 1: Iniciar Creación

1. Haga clic en el botón **"+ Nueva Visita"** o **"Agregar"**
2. Se abrirá el formulario de nueva visita

#### Paso 2: Completar Información Básica

Complete los siguientes campos obligatorios:

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| **Tipo de Panel** | Seleccione el tipo de panel | ✅ Sí |
| **Panel** | Seleccione el panel a visitar | ✅ Sí |
| **Fecha** | Fecha de la visita | ✅ Sí |
| **Objetivo** | Objetivo de la visita | ✅ Sí |
| **Observaciones** | Notas adicionales | ❌ No |

#### Paso 3: Guardar

1. Verifique que todos los campos obligatorios estén completos
2. Haga clic en **"Guardar"**
3. El sistema confirmará la creación de la visita

### 3.6 Editar Visita

1. En la lista de visitas, localice la visita a editar
2. Haga clic en el icono de **edición** (✏️) o en el nombre de la visita
3. Modifique los campos necesarios
4. Haga clic en **"Guardar"**

### 3.7 Eliminar Visita

1. Localice la visita en el listado
2. Haga clic en el icono de **eliminar** (🗑️)
3. Confirme la eliminación en el diálogo de confirmación

> ⚠️ **Advertencia**: La eliminación de visitas puede ser irreversible. Asegúrese antes de confirmar.

### 3.8 Ver Detalles de Visita

1. Haga clic en el **ID** o **nombre** de la visita
2. Se mostrará la página de detalles con toda la información
3. Desde esta vista puede:
   - Ver información completa
   - Editar la visita
   - Volver al listado

### 3.9 Crear Visita desde un Panel

También puede crear una visita directamente desde la ficha de un panel:

1. Acceda a `Registros > Paneles`
2. Seleccione el panel deseado
3. Haga clic en **"Nueva Visita"**
4. El panel se preseleccionará automáticamente

---

## 4. Justificaciones

### 4.1 Descripción

El módulo de **Justificaciones** permite registrar y gestionar las razones por las cuales no se pudo realizar una visita programada.

### 4.2 Acceder a Justificaciones

**Ruta**: `Consultas > Justificaciones`

**URL**: `/apps/justifications`

### 4.3 Lista de Justificaciones

La tabla muestra todas las justificaciones registradas:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único |
| **Panel** | Panel relacionado |
| **Tipo** | Tipo de justificación |
| **Fecha** | Fecha de la justificación |
| **Motivo** | Razón de la justificación |
| **Estado** | Pendiente/Aprobada/Rechazada |
| **Acciones** | Opciones disponibles |

### 4.4 Crear Nueva Justificación

#### Paso 1: Iniciar Creación

1. Haga clic en **"+ Nueva Justificación"**
2. Se abrirá el formulario de justificación

#### Paso 2: Completar Información

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| **Tipo de Panel** | Tipo de panel afectado | ✅ Sí |
| **Panel** | Panel específico | ✅ Sí |
| **Fecha** | Fecha de la justificación | ✅ Sí |
| **Motivo** | Razón de la justificación | ✅ Sí |
| **Descripción** | Detalle adicional | ❌ No |

#### Paso 3: Guardar

1. Complete todos los campos obligatorios
2. Haga clic en **"Guardar"**
3. La justificación quedará en estado **"Pendiente"** hasta su aprobación

### 4.5 Estados de Justificación

| Estado | Descripción | Color |
|--------|-------------|-------|
| **Pendiente** | Esperando revisión | 🟡 Amarillo |
| **Aprobada** | Justificación aceptada | 🟢 Verde |
| **Rechazada** | Justificación no aceptada | 🔴 Rojo |

### 4.6 Editar Justificación

> ⚠️ **Nota**: Solo puede editar justificaciones en estado **"Pendiente"**.

1. Localice la justificación en el listado
2. Haga clic en el icono de edición
3. Modifique los campos necesarios
4. Guarde los cambios

### 4.7 Ver Detalles

1. Haga clic en el ID o nombre de la justificación
2. Se mostrará la página de detalles
3. Podrá ver:
   - Información completa
   - Historial de cambios
   - Estado actual

### 4.8 Flujo de Aprobación (Supervisores)

Si tiene rol de supervisor, puede aprobar o rechazar justificaciones:

1. Acceda a la justificación pendiente
2. Revise la información proporcionada
3. Seleccione **"Aprobar"** o **"Rechazar"**
4. Opcionalmente, agregue un comentario
5. Confirme la acción

---

## 5. Flujos de Trabajo Comunes

### 5.1 Registrar una Visita Exitosa

```
1. Consultas > Visitas > + Nueva Visita
2. Seleccionar tipo de panel
3. Seleccionar panel
4. Ingresar fecha y objetivo
5. Guardar
```

### 5.2 Justificar una Visita No Realizada

```
1. Consultas > Justificaciones > + Nueva Justificación
2. Seleccionar el panel que no se visitó
3. Ingresar fecha y motivo
4. Guardar
5. Esperar aprobación del supervisor
```

### 5.3 Revisar Actividades del Día

```
1. Consultas > Calendario
2. Seleccionar vista "Día"
3. Revisar eventos programados
4. Hacer clic en cada evento para ver detalles
```

---

## 6. Validaciones y Mensajes

### 6.1 Mensajes de Error Comunes

| Mensaje | Causa | Solución |
|---------|-------|----------|
| "El tipo de panel es requerido" | Campo vacío | Seleccione un tipo de panel |
| "El panel es requerido" | Campo vacío | Seleccione un panel |
| "La fecha es requerida" | Campo vacío | Ingrese una fecha válida |
| "El objetivo es requerido" | Campo vacío | Escriba el objetivo de la visita |

### 6.2 Mensajes de Éxito

- ✅ "Visita creada exitosamente"
- ✅ "Visita actualizada correctamente"
- ✅ "Justificación registrada"

---

## 7. Consejos y Mejores Prácticas

### Para Visitas

1. **Registre las visitas el mismo día** que las realiza
2. **Sea específico en los objetivos** para facilitar el seguimiento
3. **Agregue observaciones** relevantes para futuras referencias
4. **Revise el calendario** antes de programar nuevas visitas

### Para Justificaciones

1. **Justifique a tiempo** - no deje pasar muchos días
2. **Sea claro en el motivo** - facilita la aprobación
3. **Proporcione detalles** cuando sea necesario
4. **Verifique el estado** de sus justificaciones pendientes

---

*Anterior: [Módulo de Tableros](./02-tableros.md) | Siguiente: [Módulo de Registros](./04-registros.md)*
