import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { selectUserClassifications } from '../../store/userClassificationsSlice';
import { selectUserRegions } from '../../store/userRegionsSlice';

/**
 * The basic info tab.
 */
function AdditionalInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const userClassifications = useAppSelector(selectUserClassifications);
	const userRegions = useAppSelector(selectUserRegions);

	// Calcula la fecha de hace 18 años a partir de la fecha actual
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);

	const categoryItems = [
		{ label: 'Junior', name: 'Junior' },
		{ label: 'Senior', name: 'Senior' },
		{ label: 'Comercial', name: 'Comercial' },
		{ label: 'Coordinador', name: 'Coordinador' }
	];

	return (
		<div>
			<Controller
				name="classificationId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="classificationId"
						className="mt-32"
						options={userClassifications || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
						value={userClassifications.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Clasificación"
								autoFocus
								error={!!errors.classificationId}
								helperText={errors?.classificationId?.message as string}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="category"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="category"
						className="mt-32"
						autoFocus
						options={categoryItems}
						getOptionLabel={(option) => option.label}
						onChange={(_, data) => (data ? field.onChange(data.name) : field.onChange(data))}
						value={categoryItems.find((item) => item.name === field.value) || null}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								required
								label="Categoría"
								error={!!errors.category}
								helperText={errors?.category?.message as string}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="regionId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="regionId"
						className="mt-32"
						options={userRegions || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
						value={userRegions.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Región"
								error={!!errors.regionId}
								helperText={errors?.regionId?.message as string}
							/>
						)}
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

export default AdditionalInfoTab;
