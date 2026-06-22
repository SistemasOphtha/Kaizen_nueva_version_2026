import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';

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
		</div>
	);
}

export default BasicInfoTab;
