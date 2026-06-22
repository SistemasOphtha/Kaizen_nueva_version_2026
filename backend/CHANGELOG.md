# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.0.2] - 2024-11-26

### Agregado
- Soft delete en todos los modelos (paranoid: true)
- Script de migración para agregar columnas deletedAt
- Notificaciones automáticas al crear/asignar terceros
- Validación de portafolio al crear visitas
- Gráfico mensual de impactos con datos de 12 meses
- Lista de terceros con impactos y visitas del mes
- Documentación completa en README

### Cambiado
- Refactorización de controladores para usar servicios
- Mejora en el cálculo de porcentajes de cumplimiento
- Actualización de estructura de respuesta de widgets

### Corregido
- Eliminación de notificaciones duplicadas al asignar terceros
- Cálculo correcto de días laborables excluyendo festivos

## [0.0.1] - 2024-01-01

### Agregado
- Configuración inicial del proyecto
- Autenticación con JWT
- CRUD de usuarios
- CRUD de terceros (médicos, droguerías, comercios)
- Gestión de visitas
- Sistema de portafolios
- Calendario de eventos
- Planes de trabajo (workplan)
- Sistema de justificaciones
- Widgets de dashboard
- Reportes de impactos
- Sistema de notificaciones
- Configuración de días festivos
