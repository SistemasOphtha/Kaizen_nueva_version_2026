# Guía de Contribución

Gracias por tu interés en contribuir a este proyecto.

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado previamente en los Issues
2. Crea un nuevo Issue con:
   - Título descriptivo
   - Pasos para reproducir el error
   - Comportamiento esperado vs actual
   - Capturas de pantalla si aplica
   - Versión de Node.js y sistema operativo

### Proponer Mejoras

1. Abre un Issue describiendo la mejora
2. Espera feedback antes de comenzar a desarrollar
3. Sigue el flujo de trabajo de Git

## Flujo de Trabajo

### Branches

- `main` - Código en producción
- `develop` - Rama de desarrollo
- `feature/*` - Nuevas funcionalidades
- `bugfix/*` - Corrección de errores
- `hotfix/*` - Correcciones urgentes en producción

### Proceso

1. Fork del repositorio
2. Crea una rama desde `develop`:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
3. Realiza tus cambios
4. Ejecuta las pruebas:
   ```bash
   npm test
   ```
5. Commit con mensajes descriptivos:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad X"
   ```
6. Push a tu fork:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
7. Crea un Pull Request hacia `develop`

## Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, punto y coma, etc (sin cambios de código)
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

### Ejemplos

```bash
feat: agregar endpoint para exportar reportes
fix: corregir cálculo de días laborables
docs: actualizar README con nuevos endpoints
refactor: simplificar lógica de validación de portafolio
```

## Estándares de Código

### JavaScript

- Usar ES6+ features
- Preferir `const` sobre `let`, evitar `var`
- Usar async/await sobre callbacks
- Documentar funciones con JSDoc

### Estructura

- Controladores: Solo manejar request/response
- Servicios: Lógica de negocio
- Modelos: Definición de datos

### Ejemplo de Código

```javascript
/**
 * Obtiene los impactos de un usuario
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<object>} - Datos de impactos
 */
const getImpacts = async (userId, rol) => {
  try {
    // Lógica aquí
  } catch (error) {
    logger.error('Error al obtener impactos', error);
    throw error;
  }
};
```

## Revisión de Código

Los Pull Requests serán revisados considerando:

- Funcionalidad correcta
- Tests incluidos
- Código limpio y legible
- Sin conflictos con `develop`
- Documentación actualizada si aplica

## Preguntas

Si tienes dudas, abre un Issue con la etiqueta `question`.
