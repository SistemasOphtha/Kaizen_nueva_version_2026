# Manual de Usuario - Módulo de Tableros (Dashboards)

## 1. Descripción General

El módulo de **Tableros** proporciona una vista consolidada de indicadores, métricas y reportes del sistema. Permite a los usuarios visualizar el estado general de las operaciones y tomar decisiones basadas en datos.

### Acceso al Módulo

1. En el menú lateral, haga clic en **"Tableros"**
2. Seleccione el tablero que desea visualizar

---

## 2. Indicadores

### 2.1 ¿Qué son los Indicadores?

El tablero de **Indicadores** muestra métricas clave de desempeño relacionadas con las visitas y el cumplimiento de objetivos.

### 2.2 Acceder a Indicadores

**Ruta**: `Tableros > Indicadores`

**URL**: `/dashboards/indicators`

### 2.3 Métricas Disponibles

| Indicador | Descripción |
|-----------|-------------|
| **Paneles Asignados** | Total de paneles asignados al usuario/equipo |
| **Paneles con Impacto** | Paneles que han recibido al menos una visita |
| **Visitas Realizadas** | Número total de visitas completadas |
| **Paneles Sin Visitar** | Paneles que aún no han sido visitados |

### 2.4 Filtros Disponibles

Puede filtrar los indicadores por:

- **Rango de fechas**: Fecha inicio y fecha fin
- **Región**: Filtrar por zona geográfica
- **Usuario**: Ver indicadores de un usuario específico

### 2.5 Cómo Usar los Filtros

1. En la parte superior del tablero, localice la sección de filtros
2. Seleccione el **rango de fechas** deseado
3. Opcionalmente, seleccione una **región** o **usuario**
4. Los indicadores se actualizarán automáticamente

---

## 3. Visitas y Justificaciones Pendientes

### 3.1 Descripción

Este tablero muestra un resumen de las visitas programadas y las justificaciones pendientes de revisión.

### 3.2 Acceder al Tablero

**Ruta**: `Tableros > Visitas y Justificaciones`

**URL**: `/dashboards/pending-visits`

### 3.3 Información Mostrada

- **Visitas Pendientes**: Lista de visitas programadas que aún no se han realizado
- **Justificaciones Pendientes**: Justificaciones que requieren aprobación
- **Estado de Cumplimiento**: Porcentaje de visitas completadas vs programadas

### 3.4 Acciones Disponibles

| Acción | Descripción |
|--------|-------------|
| **Ver Detalle** | Acceder a los detalles de una visita o justificación |
| **Aprobar/Rechazar** | Para supervisores: gestionar justificaciones |
| **Exportar** | Descargar listado en formato Excel |

---

## 4. Reportes

### 4.1 Descripción

El módulo de **Reportes** permite generar y descargar informes detallados sobre las actividades del sistema.

### 4.2 Acceder a Reportes

**Ruta**: `Tableros > Reportes`

**URL**: `/dashboards/reports`

### 4.3 Tipos de Reportes

| Reporte | Descripción |
|---------|-------------|
| **Reporte de Visitas** | Detalle de todas las visitas realizadas |
| **Reporte de Paneles** | Información completa de paneles |
| **Reporte de Cumplimiento** | Métricas de cumplimiento por usuario/región |
| **Reporte de Justificaciones** | Listado de justificaciones y su estado |

### 4.4 Generar un Reporte

1. Acceda a `Tableros > Reportes`
2. Seleccione el **tipo de reporte** que desea generar
3. Configure los **filtros** según sus necesidades:
   - Tipo de panel
   - Identificación
   - Nombre
   - Región
   - Estado
   - Usuario
4. Haga clic en **"Generar Reporte"**
5. El sistema procesará la solicitud y generará el archivo

### 4.5 Descargar Reportes

1. Una vez generado el reporte, aparecerá un botón de **"Descargar"**
2. Haga clic para obtener el archivo en formato Excel (.xlsx)
3. El archivo se guardará en su carpeta de descargas

### 4.6 Filtros de Reportes

| Filtro | Descripción |
|--------|-------------|
| **Tipo** | Tipo de panel (médico, institución, etc.) |
| **Identificación** | Número de identificación del panel |
| **Nombre** | Nombre del panel o parte del nombre |
| **Región** | Zona geográfica |
| **Estado** | Estado del panel (activo, inactivo) |
| **Usuario** | Usuario asignado |

---

## 5. Plan de Trabajo

### 5.1 Descripción

El tablero de **Plan de Trabajo** permite visualizar y gestionar las actividades planificadas para un período determinado.

### 5.2 Acceder al Plan de Trabajo

**Ruta**: `Tableros > Plan de trabajo`

**URL**: `/dashboards/workplans`

### 5.3 Elementos del Plan de Trabajo

| Elemento | Descripción |
|----------|-------------|
| **Actividades Programadas** | Lista de actividades planificadas |
| **Estado de Avance** | Progreso de cumplimiento del plan |
| **Fechas Límite** | Fechas de vencimiento de actividades |
| **Responsables** | Usuarios asignados a cada actividad |

### 5.4 Visualización

El plan de trabajo puede visualizarse en diferentes formatos:

- **Vista de Lista**: Listado detallado de actividades
- **Vista de Calendario**: Actividades organizadas por fecha
- **Vista de Kanban**: Actividades organizadas por estado

### 5.5 Gestionar Actividades

#### Crear Nueva Actividad

1. Haga clic en el botón **"+ Nueva Actividad"**
2. Complete los campos requeridos:
   - Título de la actividad
   - Descripción
   - Fecha de inicio
   - Fecha de vencimiento
   - Responsable
3. Haga clic en **"Guardar"**

#### Editar Actividad

1. Localice la actividad en el listado
2. Haga clic en el icono de **edición** (✏️)
3. Modifique los campos necesarios
4. Haga clic en **"Guardar"**

#### Marcar como Completada

1. Localice la actividad
2. Haga clic en el checkbox o botón de **"Completar"**
3. La actividad cambiará su estado a "Completada"

---

## 6. Widgets Comunes

### 6.1 Tarjetas de Resumen

Las tarjetas de resumen muestran métricas clave en formato visual:

```
┌─────────────────────────┐
│  📊 Paneles Asignados   │
│         150             │
│    ▲ +5% vs mes ant.    │
└─────────────────────────┘
```

### 6.2 Gráficos

Los tableros incluyen diferentes tipos de gráficos:

- **Gráficos de barras**: Comparativas entre períodos
- **Gráficos circulares**: Distribución porcentual
- **Gráficos de línea**: Tendencias en el tiempo

### 6.3 Tablas de Datos

Las tablas permiten:

- **Ordenar** por cualquier columna (clic en el encabezado)
- **Filtrar** usando la barra de búsqueda
- **Paginar** para navegar entre registros
- **Exportar** datos a Excel

---

## 7. Consejos de Uso

### Mejores Prácticas

1. **Revise los indicadores diariamente** para mantener el control de sus actividades
2. **Use filtros** para enfocarse en información relevante
3. **Exporte reportes** periódicamente para análisis offline
4. **Configure alertas** si el sistema lo permite

### Solución de Problemas

| Problema | Solución |
|----------|----------|
| Los datos no cargan | Actualice la página (F5) |
| Filtros no funcionan | Limpie los filtros y vuelva a aplicar |
| No puede exportar | Verifique permisos con el administrador |
| Datos desactualizados | Los datos se actualizan cada cierto tiempo, espere o actualice |

---

*Anterior: [Introducción y Acceso](./01-introduccion-acceso.md) | Siguiente: [Módulo de Consultas](./03-consultas.md)*
