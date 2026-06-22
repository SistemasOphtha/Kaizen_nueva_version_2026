import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { DateTimePicker,  } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
// import { parseISO } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Controller, useFormContext } from 'react-hook-form';
// import { selectUser } from 'app/store/user/userSlice';
import { useEffect } from 'react';
import { selectUserRegions } from '../../../../records/user/store/userRegionsSlice';
import { selectUsers } from '../../../../records/user/store/usersSlice';

/**
 * The basic info tab.
 */

interface ImpactFilterFormType {
	startDate: string;
	endDate: string;
	region: number;
	user: number;
}

function ImpactFilterForm() {
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;

	const users = useAppSelector(selectUsers);
	const userRegions = useAppSelector(selectUserRegions);
	// const { id } = useAppSelector(selectUser);

	const { user, region } = watch() as ImpactFilterFormType;

	const currentDate = new Date();
	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const lastDayOfMonth = currentDate;
	// maxDate.setFullYear(maxDate.getFullYear() - 18);

	useEffect(() => {
		setValue('startDate', firstDayOfMonth);
		setValue('endDate', lastDayOfMonth);
	}, []);

	useEffect(() => {
		// setValue('startDate', firstDayOfMonth.toISOString());
		// setValue('endDate', lastDayOfMonth.toISOString());
		setValue('region', 0);
		setValue('user', 0);
	}, [setValue]);

	useEffect(() => {
		if (region == null) setValue('region', 0);
		if (user == null) setValue('user', 0);
	}, [region, user]);

	return (
		<div>
			<p> Establezca el rango de fechas para analizar las visitas realizadas durante ese lapso.</p>
			<div className="flex gap-5 w-3/4">
				<Controller
					name="startDate"
					control={control}
					render={({ field }) => (
						<DatePicker
							{...field}
							className="mt-32"
							format="dd-MM-yyyy"
							slotProps={{
								textField: {
									id: 'startDate',
									label: 'Fecha Inicio',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.startDate,
									helperText: errors?.startDate?.message as string
								},
								inputAdornment: {
									position: 'start',
									children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
								}
							}}
						/>
					)}
				/>

				<Controller
					name="endDate"
					control={control}
					render={({ field }) => (
						<DatePicker
							{...field}
							className="mt-32"
							format="dd-MM-yyyy"
							slotProps={{
								textField: {
									id: 'endDate',
									label: 'Fecha Fin',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.endDate,
									helperText: errors?.endDate?.message as string
								},
								inputAdornment: {
									position: 'start',
									children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
								}
							}}
						/>
					)}
				/>
			</div>
			<Divider className="my-32" />

			<p>Establezca la región ó usuario para filtrar los impactos</p>
			<div className="flex gap-5 w-3/4">
				<Controller
					name="region"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="region"
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
									error={!!errors.region}
									helperText={errors?.region?.message as string}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name="user"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="user"
							className="mt-32 w-1/3"
							options={users || []}
							getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
							onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
							value={users.find((item) => item.id === field.value) || null}
							renderOption={(props, option) => (
								<MenuItem {...props}>
									{option.firstName} {option.lastName}
								</MenuItem>
							)}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Representante"
									error={!!errors.user}
									helperText={errors?.user?.message as string}
								/>
							)}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default ImpactFilterForm;
