import { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

interface Section {
	id: string;
	title: string;
	roles: ('admin' | 'rep' | 'tech')[];
	content: React.ReactNode;
}

function TutorialApp() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [activeSectionId, setActiveSectionId] = useState<string>('intro');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'rep' | 'tech'>('all');

	const sections: Section[] = [
		{
			id: 'intro',
			title: '🚀 Introducción',
			roles: ['admin', 'rep'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Bienvenido al manual oficial e instructivo integrado de la plataforma <strong>Ophtha (Kaizen 3.0)</strong>,
						diseñada para centralizar la auditoría de visitas médicas, la administración geográfica de droguerías y médicos,
						y la planificación diaria comercial de la fuerza de ventas.
					</Typography>
					<Typography variant="body1" className="mb-24">
						La plataforma está accesible directamente en producción en la siguiente dirección web:
						{' '}<a href="https://kaizenophtha.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">https://kaizenophtha.com</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Roles principales de usuario</Typography>
					<div className="flex flex-col gap-12 mb-24">
						<Box className="p-12 rounded-8 bg-purple-500/10 border-1 border-purple-500/20">
							<div className="flex items-center gap-8 mb-4">
								<Chip label="Administrador" size="small" color="secondary" />
							</div>
							<Typography variant="body2" color="text.secondary">
								Tienen control nacional absoluto. Gestionan médicos, aprueban portafolios, auditan sesiones,
								configuran parámetros de visitas y descargan reportes avanzados dinámicos.
							</Typography>
						</Box>
						<Box className="p-12 rounded-8 bg-teal-500/10 border-1 border-teal-500/20">
							<div className="flex items-center gap-8 mb-4">
								<Chip label="Representante" size="small" color="primary" />
							</div>
							<Typography variant="body2" color="text.secondary">
								Fuerza comercial en campo. Acceso exclusivo a su portafolio de médicos asignados. Planifican rutas,
								reportan visitas (validadas por GPS), cargan Habeas Data y justifican impactos faltantes al fin del mes.
							</Typography>
						</Box>
					</div>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5 mb-16">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6 flex items-center gap-8">
							💼 CASO DE USO GLOBAL: AUDITORÍA DE PRODUCTIVIDAD
						</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Escenario:</strong> La directiva comercial evalúa el cumplimiento de visitas de un asesor en Cali.
							<br />
							<strong>Flujo:</strong> El asesor planifica sus rutas semanales y reporta las visitas en sitio con georeferenciación. Al final del mes, el sistema liquida el porcentaje de visitas completadas. Los médicos que no alcancen el impacto requerido quedan marcados para que el visitador registre su justificación, la cual será auditada y aprobada por la supervisora.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'autenticacion',
			title: '🔑 Seguridad y Doble Factor (2FA)',
			roles: ['admin', 'rep'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Kaizen 3.0 integra un módulo de seguridad avanzada de **Autenticación de Dos Factores (2FA)**. Al activarlo,
						el inicio de sesión requerirá no solo la contraseña, sino también un token digital temporal de 6 dígitos
						generado desde una aplicación en su celular (ej. Google Authenticator o Authy).
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Cómo Activar el 2FA en su Cuenta</Typography>
					<ol className="list-decimal pl-20 mb-24 flex flex-col gap-12">
						<li>
							<strong>Ir a la sección de Configuración:</strong> Inicie sesión y acceda a la pestaña de contraseña:
							{' '}<a href="https://kaizenophtha.com/settings/reset-password" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/settings/reset-password</a>.
						</li>
						<li>
							<strong>Escanear el Código QR:</strong> Abra Google Authenticator o Authy en su celular, seleccione la opción de escanear código QR, y apunte a la pantalla del sistema.
						</li>
						<li>
							<strong>Verificar e Iniciar:</strong> Ingrese el código temporal de 6 dígitos que aparece en su teléfono en el campo de texto y pulse "Activar".
						</li>
					</ol>

					<Box className="p-16 rounded-8 bg-amber-500/10 border-l-4 border-amber-500 mb-24">
						<Typography variant="subtitle2" className="font-bold text-amber-700 mb-4">⚠️ NOTA IMPORTANTE AL INICIAR SESIÓN</Typography>
						<Typography variant="body2" color="text.secondary">
							Una vez activado el 2FA, cada login en <a href="https://kaizenophtha.com/sign-in" className="underline">https://kaizenophtha.com/sign-in</a> requerirá ingresar la clave y, en una pantalla secundaria, el código temporal activo de su móvil.
						</Typography>
					</Box>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">🔒 CASO DE USO: PÉRDIDA O CAMBIO DE CELULAR</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Problema:</strong> Un visitador pierde su celular y no puede obtener el código de 6 dígitos para ingresar.
							<br />
							<strong>Solución:</strong> El Administrador debe ingresar al registro del visitador en la sección <strong>Usuarios</strong> y dar clic en el botón <strong>"Desactivar 2FA"</strong>. Esto deshabilita la validación para que el usuario pueda ingresar y volver a enrolar su nuevo dispositivo.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'medicos',
			title: '👥 Registro de Médicos (Terceros)',
			roles: ['admin'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Los médicos y droguerías se gestionan como <strong>Terceros</strong> desde la URL:
						{' '}<a href="https://kaizenophtha.com/records/thirds" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/records/thirds</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Flujo de Consentimiento de Habeas Data</Typography>
					<p className="mb-16">
						Para dar cumplimiento a las normativas legales, cada ficha de médico cuenta con una sección dedicada a la recolección y firma de consentimiento de uso de datos personales:
					</p>
					<ul className="list-disc pl-20 mb-24 flex flex-col gap-8">
						<li><strong>Firma manuscrita en pantalla:</strong> Abre una pizarra táctil para que el médico firme digitalmente usando el dedo (móviles/tablets) o el mouse (PC).</li>
						<li><strong>Carga de consentimiento físico:</strong> Permite cargar un documento digital (foto o PDF) del consentimiento firmado físicamente, que se sube automáticamente a la nube de <strong>Amazon S3</strong>.</li>
					</ul>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">📝 CASO DE USO: AUTO-CAPTURA DE COORDENADAS GPS</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Escenario:</strong> El administrador crea un médico desde la PC del corporativo, pero no conoce las coordenadas exactas de su consultorio.
							<br />
							<strong>Operación:</strong>
							1. Al guardar el médico, las coordenadas quedan en blanco.
							2. El visitador realiza la primera visita en campo y reporta desde el móvil.
							3. El sistema detecta que las coordenadas del médico están vacías y guarda la ubicación del celular del asesor como la coordenada oficial del consultorio de manera automática.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'excel',
			title: '📥 Importación Masiva desde Excel',
			roles: ['admin'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Los administradores pueden registrar paneles de forma masiva subiendo plantillas en formato Microsoft Excel (.xlsx) desde la ruta:
						{' '}<a href="https://kaizenophtha.com/records/thirds" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/records/thirds</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Pasos para la Importación Correcta</Typography>
					<div className="flex flex-col gap-12 mb-24">
						<div className="flex items-start gap-8">
							<span className="step-num">1</span>
							<div className="step-content">
								<Typography className="font-semibold text-white">Descargar Plantilla:</Typography>
								<p>Descargue la estructura oficial desde el botón "Descargar Plantilla" para asegurar la correspondencia de las cabeceras.</p>
							</div>
						</div>
						<div className="flex items-start gap-8">
							<span className="step-num">2</span>
							<div className="step-content">
								<Typography className="font-semibold text-white">Llenado y Normalización:</Typography>
								<p>Llene los datos. El importador limpiará automáticamente caracteres especiales y tildes, enlazará las fechas de cumpleaños en formato <code>DD-MM</code> y emparejará ciudades con sus regiones.</p>
							</div>
						</div>
						<div className="flex items-start gap-8">
							<span className="step-num">3</span>
							<div className="step-content">
								<Typography className="font-semibold text-white">Subir y Auditar Errores:</Typography>
								<p>Cargue el archivo. Al terminar, se despliega una bitácora detallando las filas exitosas y el motivo exacto de cualquier fila rechazada.</p>
							</div>
						</div>
					</div>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">📈 CASO DE USO: CORRECCIÓN SIN DUPLICADOS</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Problema:</strong> Se cargan 100 registros, pero la fila 45 falla por formato de email inválido.
							<br />
							<strong>Procedimiento:</strong> Los otros 99 registros ya se guardaron en la base de datos. Modifique únicamente el email de la fila 45 en su Excel y vuelva a subir el archivo completo. El sistema detectará por cédula los ya existentes, omitirá duplicarlos, y registrará exitosamente la fila faltante.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'portafolios',
			title: '📂 Gestión de Portafolios',
			roles: ['admin'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						El portafolio define qué visitador comercial atiende a qué médicos. Un visitador solo puede registrar visitas, ver alertas y agendar planes sobre médicos aprobados y cargados en su portafolio.
					</Typography>
					<Typography variant="body1" className="mb-24">
						Esta sección se gestiona desde el perfil de cada usuario en:
						{' '}<a href="https://kaizenophtha.com/records/users" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/records/users</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Herramientas de Control</Typography>
					<ul className="list-disc pl-20 mb-24 flex flex-col gap-8">
						<li><strong>Aprobar/Desaprobar (👍 / 👎):</strong> Permite habilitar o deshabilitar la relación del visitador con el médico. Si está desaprobada, el médico no aparecerá en el móvil del asesor comercial.</li>
						<li><strong>Desasignar (Papelera 🗑️):</strong> Elimina la relación física de la base de datos para desvincular al médico.</li>
						<li><strong>Buscador Directo:</strong> Permite escribir el nombre o NIT de un médico para agregarlo al portafolio activo al instante.</li>
						<li><strong>Acciones en lote:</strong> Con las casillas de verificación a la izquierda de cada médico, el administrador puede seleccionar múltiples registros para aprobarlos o desasignarlos en lote.</li>
					</ul>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">💼 CASO DE USO: REASIGNACIÓN DE CARTERA</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Objetivo:</strong> Reasignar 20 médicos asignados a Andrés para que ahora los maneje Carlos.
							<br />
							<strong>Operación:</strong> El administrador ingresa al perfil de Andrés, selecciona los 20 médicos de la lista, y hace clic en "Desasignar seleccionados". A continuación, ingresa al perfil de Carlos, busca a los médicos, presiona "Asignar" y luego los aprueba masivamente.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'visitas',
			title: '📍 Visitas y Verificación GPS',
			roles: ['rep'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Los visitadores médicos registran sus reportes de campo desde la pestaña de **Visitas**:
						{' '}<a href="https://kaizenophtha.com/apps/visits" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/apps/visits</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Fórmula de Verificación de Distancia (Geofencing)</Typography>
					<p className="mb-16">
						Para asegurar la veracidad del trabajo comercial, el sistema realiza una validación cruzada geográfica en el backend:
					</p>
					<div className="flex flex-col gap-12 mb-24">
						<div className="p-12 rounded-8 bg-blue-500/10 border-1 border-blue-500/20">
							<Typography className="font-bold text-white mb-4">1. Captura de Ubicación GPS:</Typography>
							<Typography variant="body2" color="text.secondary">
								El dispositivo del visitador móvil envía su latitud/longitud en tiempo real al enviar el formulario.
							</Typography>
						</div>
						<div className="p-12 rounded-8 bg-blue-500/10 border-1 border-blue-500/20">
							<Typography className="font-bold text-white mb-4">2. Cálculo Métrico:</Typography>
							<Typography variant="body2" color="text.secondary">
								El backend calcula la distancia lineal entre las coordenadas del visitador y las del consultorio del médico.
							</Typography>
						</div>
						<div className="p-12 rounded-8 bg-blue-500/10 border-1 border-blue-500/20">
							<Typography className="font-bold text-white mb-4">3. Insignia de Verificación:</Typography>
							<Typography variant="body2" color="text.secondary">
								Si el visitador se encuentra a <strong>100 metros o menos</strong> del médico, la visita se marca con éxito como <code>Verificada (isVerified = true)</code>.
							</Typography>
						</div>
					</div>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">🗺️ CASO DE USO: VISITA NO VERIFICADA</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Escenario:</strong> Un representante comercial olvida reportar la visita dentro del consultorio y lo hace al final del día desde su casa.
							<br />
							<strong>Consecuencia:</strong> Como la ubicación GPS de su casa excede el límite de 100 metros respecto al médico, la visita se guardará con éxito en su historial, pero se registrará como <strong>"No Verificada"</strong>. La supervisora podrá auditar esta anomalía desde su dashboard.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'justificaciones',
			title: '📄 Justificaciones de Cierre de Mes',
			roles: ['admin', 'rep'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Cada médico o droguería tiene un impacto mínimo mensual requerido (número de visitas requeridas). Al finalizar el mes,
						las visitas faltantes deben registrar una justificación desde:
						{' '}<a href="https://kaizenophtha.com/apps/justifications" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/apps/justifications</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Ciclo de Vida de una Justificación</Typography>
					<ol className="list-decimal pl-20 mb-24 flex flex-col gap-8">
						<li><strong>Auto-detección:</strong> Al cerrarse el mes, el sistema lista los médicos que no completaron sus visitas.</li>
						<li><strong>Registro del Visitador:</strong> El visitador selecciona el registro y expone los motivos (vacaciones, incapacidad, etc.).</li>
						<li><strong>Aprobación:</strong> El administrador revisa la justificación y da clic en "Aprobar", lo cual valida el indicador mensual del visitador.</li>
					</ol>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">🏢 CASO DE USO: APROBACIÓN MANUAL DIRECTA POR ADMINISTRADOR</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Escenario:</strong> Un médico de la Dra. Clara (quien está con incapacidad) no completó su impacto.
							<br />
							<strong>Solución:</strong> Como el médico no pertenece al portafolio de la supervisora directiva (Johana), un usuario estándar no podría justificarlo. Sin embargo, gracias al bypass de rol de **Administrador**, Johana puede crear, redactar y auto-aprobar directamente la justificación de ese médico, resolviendo el indicador de Clara al instante.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'agenda',
			title: '📅 Agenda y Calendario Unificado',
			roles: ['admin', 'rep'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						El calendario es un visor interactivo consolidado que unifica las actividades comerciales y eventos en la URL:
						{' '}<a href="https://kaizenophtha.com/apps/calendar" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/apps/calendar</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Etiquetas por Colores en Pantalla</Typography>
					<ul className="list-disc pl-20 mb-24 flex flex-col gap-12">
						<li><strong className="text-emerald-500">● Verde (Visita):</strong> Programación e itinerario de las visitas en campo del día.</li>
						<li><strong className="text-amber-500">● Amarillo (Plan de Trabajo):</strong> Bloques semanales del plan de visitas del asesor.</li>
						<li><strong className="text-indigo-400">● Azul (Cumpleaños):</strong> Alertas de cumpleaños automáticas de médicos asignados al visitador.</li>
					</ul>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">📅 CASO DE USO: PREPARACIÓN DE ENTREGAS POR CUMPLEAÑOS</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Escenario:</strong> El visitador desea planificar a qué doctores entregar obsequios de cumpleaños la siguiente semana.
							<br />
							<strong>Operación:</strong> Desmarca los checks "Visitas" y "Plan de trabajo" en el menú de la izquierda del calendario. La vista queda limpia mostrando únicamente los bloques azules de "Cumpleaños". Agenda las visitas los días correspondientes para optimizar la entrega de obsequios.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'reportes',
			title: '📊 Constructor de Reportes e Informes',
			roles: ['admin'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Permite exportar informes y auditar coberturas geográficas desde:
						{' '}<a href="https://kaizenophtha.com/dashboards/reports" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/dashboards/reports</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Constructor de Informes "A Mano Alzada"</Typography>
					<p className="mb-24">
						Este módulo permite seleccionar qué columnas del reporte incluir (ej: fecha, comentarios, especialidad) y aplicar filtros cruzados por <strong>Asesor</strong>, <strong>Región</strong> y <strong>Rango de Fechas</strong> antes de generar el informe en Excel de manera instantánea.
					</p>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">📊 CASO DE USO: REPORTE DE MEDICOS NO VISITADOS EN EL TRIMESTRE</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Objetivo:</strong> Descargar un Excel con visitas nulas de la zona 'Costa' de los últimos 90 días.
							<br />
							<strong>Operación:</strong> El administrador selecciona las columnas <code>Identificación Tercero</code>, <code>Nombre Tercero</code> y <code>Asesor</code>. En filtros geográficos marca 'Costa', establece el rango de fechas para los últimos 3 meses y hace clic en "Generar y Descargar Excel".
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'auditoria',
			title: '🛡️ Auditoría de Sesiones',
			roles: ['admin'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Por seguridad, el sistema guarda un log detallado de accesos para evitar fugas de información. Disponible en la URL:
						{' '}<a href="https://kaizenophtha.com/records/users/session-logs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://kaizenophtha.com/records/users/session-logs</a>.
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Métricas de Control Registradas</Typography>
					<ul className="list-disc pl-20 mb-24 flex flex-col gap-8">
						<li><strong>Nombre, Apellidos y Correo</strong> del usuario.</li>
						<li><strong>Dirección IP pública</strong> del dispositivo de ingreso.</li>
						<li><strong>Browser & SO (User Agent):</strong> Dispositivo usado (Chrome en Windows, Safari en iOS, etc.).</li>
						<li><strong>Duración y Estado:</strong> Tiempos exactos de ingreso y cierre, e indicador si la sesión sigue activa.</li>
					</ul>

					<Box className="p-16 rounded-12 border-1 border-dashed border-teal-500 bg-teal-500/5">
						<Typography variant="subtitle2" className="font-bold text-teal-600 mb-6">🛡️ CASO DE USO: INGRESO SIMULTÁNEO SOSPECHOSO</Typography>
						<Typography variant="body2" color="text.secondary">
							<strong>Problema:</strong> Se sospecha que un visitador comparte su usuario con un tercero.
							<br />
							<strong>Solución:</strong> El administrador busca el email del visitador en la tabla de logs. Si visualiza inicios de sesión con 10 minutos de diferencia desde dos direcciones IP correspondientes a ciudades distintas (ej: una IP de Medellín y otra de Bogotá), se confirman las sospechas para proceder al bloqueo temporal.
						</Typography>
					</Box>
				</div>
			)
		},
		{
			id: 'arquitectura',
			title: '🛠️ Arquitectura Técnica y Servidores',
			roles: ['tech'],
			content: (
				<div>
					<Typography variant="body1" className="mb-16">
						Detalles de la infraestructura de Kaizen 3.0 en producción:
					</Typography>

					<Typography variant="h6" className="font-bold mb-12">Ficha Técnica del Sistema</Typography>
					<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
						<thead>
							<tr className="border-b-1 border-divider bg-black/10">
								<th className="p-8 text-left text-12 font-bold">Componente</th>
								<th className="p-8 text-left text-12 font-bold">Tecnología / Framework</th>
								<th className="p-8 text-left text-12 font-bold">Detalles / Versiones</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b-1 border-divider">
								<td className="p-8 text-12 font-semibold">Frontend Core</td>
								<td className="p-8 text-12">React.js (TypeScript)</td>
								<td className="p-8 text-12">MUI v5 + Redux Toolkit (RTK)</td>
							</tr>
							<tr className="border-b-1 border-divider">
								<td className="p-8 text-12 font-semibold">Backend Core</td>
								<td className="p-8 text-12">Node.js / Express.js</td>
								<td className="p-8 text-12">Compilado con TypeScript</td>
							</tr>
							<tr className="border-b-1 border-divider">
								<td className="p-8 text-12 font-semibold">Base de Datos</td>
								<td className="p-8 text-12">PostgreSQL (Sequelize ORM)</td>
								<td className="p-8 text-12">Contenedor Docker (Puerto 5434)</td>
							</tr>
							<tr className="border-b-1 border-divider">
								<td className="p-8 text-12 font-semibold">Almacenamiento</td>
								<td className="p-8 text-12">Amazon S3</td>
								<td className="p-8 text-12">Carga directa de Habeas Data</td>
							</tr>
							<tr className="border-b-1 border-divider">
								<td className="p-8 text-12 font-semibold">Servidor y Procesos</td>
								<td className="p-8 text-12">Apache Server + PM2</td>
								<td className="p-8 text-12">Port 4001 reverse proxied</td>
							</tr>
						</tbody>
					</table>

					<Typography variant="h6" className="font-bold mb-12">Configuración del Servidor y Base de Datos</Typography>
					<p className="mb-16">
						La comunicación del backend Node.js con el contenedor de base de datos PostgreSQL se realiza mediante <strong>Sockets locales de Linux</strong> en el directorio compartido <code>/var/run/postgresql</code>, evitando colisiones del Firewall TCP del servidor.
					</p>
					<p className="mb-16">
						El frontend React cuenta con reglas de enrutamiento SPA mediante el archivo <code>.htaccess</code> de Apache para evitar errores 404 al recargar URLs dinámicas:
					</p>
					<pre className="p-12 rounded-8 bg-black text-pink-400 font-mono text-11 overflow-x-auto">
						{`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`}
					</pre>
				</div>
			)
		}
	];

	// Filter sections by search query and role filter
	const filteredSections = sections.filter((section) => {
		const matchesSearch =
			section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			section.id.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesRole =
			roleFilter === 'all' || section.roles.includes(roleFilter as 'admin' | 'rep' | 'tech');

		return matchesSearch && matchesRole;
	});

	const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];

	return (
		<FusePageSimple
			header={
				<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between py-24 px-24 md:px-32 border-b-1 border-divider bg-background-paper">
					<div className="flex flex-col items-start min-w-0">
						<Typography className="text-20 md:text-24 font-bold tracking-tight">
							Tutorial y Manual de Usuario
						</Typography>
						<Typography variant="caption" className="text-text-muted">
							Documentación detallada, ejemplos y casos de uso interactivos del sistema Kaizen 3.0.
						</Typography>
					</div>
				</div>
			}
			content={
				<div className="p-24 w-full">
					<Grid container spacing={3}>
						{/* Navigation and Search Sidebar inside page */}
						<Grid item xs={12} md={4}>
							<Paper className="p-16 flex flex-col gap-16" variant="outlined">
								<TextField
									label="Buscar en el manual..."
									variant="outlined"
									size="small"
									fullWidth
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FuseSvgIcon size={20}>heroicons-outline:search</FuseSvgIcon>
											</InputAdornment>
										)
									}}
								/>

								<div className="flex flex-wrap gap-6 mb-8">
									<Chip
										label="Todos"
										size="small"
										color={roleFilter === 'all' ? 'secondary' : 'default'}
										onClick={() => setRoleFilter('all')}
									/>
									<Chip
										label="Administradores"
										size="small"
										color={roleFilter === 'admin' ? 'secondary' : 'default'}
										onClick={() => setRoleFilter('admin')}
									/>
									<Chip
										label="Representantes"
										size="small"
										color={roleFilter === 'rep' ? 'secondary' : 'default'}
										onClick={() => setRoleFilter('rep')}
									/>
									<Chip
										label="Técnico/Sistemas"
										size="small"
										color={roleFilter === 'tech' ? 'secondary' : 'default'}
										onClick={() => setRoleFilter('tech')}
									/>
								</div>

								<Divider />

								<List className="p-0">
									{filteredSections.map((section) => (
										<ListItem key={section.id} disablePadding>
											<ListItemButton
												selected={activeSectionId === section.id}
												onClick={() => setActiveSectionId(section.id)}
												className="rounded-8 mb-4"
											>
												<ListItemText
													primary={section.title}
													primaryTypographyProps={{
														className: 'font-semibold text-13'
													}}
												/>
											</ListItemButton>
										</ListItem>
									))}
									{filteredSections.length === 0 && (
										<Typography variant="body2" color="text.secondary" className="p-8 text-center">
											No se encontraron secciones.
										</Typography>
									)}
								</List>
							</Paper>
						</Grid>

						{/* Content Display Card */}
						<Grid item xs={12} md={8}>
							<Card variant="outlined" className="p-24 md:p-32 rounded-16">
								<CardContent className="p-0">
									<div className="flex justify-between items-start mb-16 border-b-1 pb-16">
										<Typography variant="h5" className="font-bold text-white tracking-tight">
											{activeSection.title}
										</Typography>
										<div className="flex gap-4">
											{activeSection.roles.includes('admin') && (
												<Chip label="Admin" size="small" color="secondary" variant="outlined" />
											)}
											{activeSection.roles.includes('rep') && (
												<Chip label="Representante" size="small" color="primary" variant="outlined" />
											)}
											{activeSection.roles.includes('tech') && (
												<Chip label="Sistemas" size="small" color="warning" variant="outlined" />
											)}
										</div>
									</div>
									{activeSection.content}
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default TutorialApp;
