import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="name"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Nombre"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>

			<Controller
				name="status"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-32"
						required
						label="Estado"
						id="status"
						select
						variant="outlined"
						fullWidth
						error={!!errors.status}
						helperText={errors?.status?.message as string}
					>
						<MenuItem value="active">Activo</MenuItem>
						<MenuItem value="inactive">Inactivo</MenuItem>
					</TextField>
				)}
			/>

			<div className="mt-32">
				<Typography variant="h6" className="mb-16">Matriz de Permisos</Typography>
				<div className="border border-gray-300 rounded overflow-hidden">
					<table className="w-full text-left border-collapse">
						<thead className="bg-gray-100">
							<tr>
								<th className="p-12 border-b">Módulo</th>
								<th className="p-12 border-b text-center">Leer</th>
								<th className="p-12 border-b text-center">Crear</th>
								<th className="p-12 border-b text-center">Actualizar</th>
								<th className="p-12 border-b text-center">Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{['Usuarios', 'Paneles', 'Portafolios', 'Visitas', 'Reportes', 'Configuraciones'].map((moduleName) => (
								<tr key={moduleName} className="hover:bg-gray-50 border-b last:border-b-0">
									<td className="p-12 font-medium">{moduleName}</td>
									{['read', 'create', 'update', 'delete'].map((action) => (
										<td key={action} className="p-12 text-center">
											<Controller
												name={`permissions.${moduleName}.${action}`}
												control={control}
												render={({ field }) => (
													<input
														type="checkbox"
														className="w-16 h-16 cursor-pointer"
														checked={field.value || false}
														onChange={(e) => field.onChange(e.target.checked)}
													/>
												)}
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default BasicInfoTab;
