# Instrucciones para Llenar la Plantilla de Terceros

## Descripción General
Esta plantilla contiene los campos necesarios para importar terceros (médicos, droguerías, laboratorios, etc.) al sistema. Los campos están en español y son insensibles a mayúsculas/minúsculas.

## Columnas y Descripciones

### Información Básica
- **tipo**/**tipotercero**: Tipo de tercero (Médico, Drogería, Comercial, Laboratorio)
- **nombre**: Nombre completo o razón social
- **tipoidentificacion**: Tipo de identificación (CC, NIT, CE, TI, etc.)
- **identificacion**: Número de identificación

### Información Personal (para médicos)
- **apellido**: Apellidos del médico
- **genero**: Género (Masculino/Femenino)
- **nombreadministrador**: Nombre del administrador (para drogerías)

### Contacto
- **correo**: Correo electrónico
- **direccion**: Dirección física
- **telefono**: Teléfono fijo
- **celular**: Teléfono celular
- **ciudad**: Ciudad de ubicación

### Información Adicional
- **fechanacimiento**: Fecha de nacimiento (formato: YYYY-MM-DD)
- **impacto**: Nivel de impacto (número del 1-100)
- **sesurtepor**: Canal de surtido (Directo, Distribuidor, Mixto)
- **estado**: Estado del tercero (Activo/Inactivo)

### Clasificación
- **clasificacion**: Clasificación del tercero (A, B, C)
- **especialidad**: Especialidad médica (solo para médicos)
- **region**: Región geográfica

## Ejemplos por Tipo de Tercero

### Médico
```
tipo: Medico
tipoidentificacion: CC
identificacion: 123456789
nombre: Dr. Juan Pérez
apellido: Pérez García
genero: Masculino
correo: juan.perez@email.com
especialidad: Cardiología
```

### Drogería
```
tipo: Drogeria
tipoidentificacion: NIT
identificacion: 901234567-8
nombre: Farmacias ABC S.A.S
nombreadministrador: Farmacias ABC
```

### Laboratorio
```
tipo: Laboratorio
tipoidentificacion: NIT
identificacion: 830123456-9
nombre: Laboratorios XYZ S.A.
```

### Comercial
```
tipo: Comercial
tipoidentificacion: NIT
identificacion: 800123456-7
nombre: Comercial ABC Ltda
```

## Notas Importantes
1. **Campos Obligatorios**: Al menos debe tener `nombre` o `identificacion`
2. **Formato de Fecha**: Usar formato YYYY-MM-DD (ejemplo: 1980-05-15)
3. **Mayúsculas/Minúsculas**: No importa el uso de mayúsculas
4. **Tildes**: El sistema normaliza automáticamente los acentos
5. **Campos Vacíos**: Pueden dejarse vacíos si no aplican
6. **Tipos de Terceros**: El sistema infiere el tipo si no se especifica

## Validación Automática
El sistema validará:
- Existencia de tipos, clasificaciones, especialidades y regiones
- Formato correcto de identificación
- Valores numéricos en campos como "impacto"
- Correos electrónicos válidos

## Errores Comunes a Evitar
- No incluir identificación
- Usar formatos de fecha incorrectos
- Dejar campos críticos vacíos (nombre o identificación)
- Usar caracteres especiales no válidos
