import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppSelector, useAppDispatch } from 'app/store';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showMessage } from 'app/store/fuse/messageSlice';
// import { useAppSelector } from 'app/store';
// import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Controller, useFormContext } from 'react-hook-form';
import { selectThirdTypes } from '../../store/thirdTypesSlice';
import { ThirdType } from '../../types/ThirdType';
import { checkIdentificationNumber, assignThird } from '../../store/thirdSlice';

/**
 * The basic info tab.
 */

interface TypeIdentificationType {
	label: string;
	name: string;
}

interface Props {
	setTabValue: (value: number) => void;
}

function BasicInfoTab({ setTabValue }: Props) {
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const navigate = useNavigate();

	const { thirdId } = routeParams;

	const dispatch = useAppDispatch();
	const [existThird, setExistThird] = useState(false);
	const [thirdFound, setThirdFound] = useState<number>();
	// const { data: third } = useAppSelector(selectThird);
	const thirdTypes = useAppSelector(selectThirdTypes);

	const { typeId, identification } = watch() as ThirdType;

	// Calcula la fecha de hace 18 años a partir de la fecha actual
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);

	const typeIdentificationItem: TypeIdentificationType[] = [
		{ label: 'CC', name: 'CC' },
		{ label: 'CE', name: 'CE' },
		{ label: 'PASAPORTE', name: 'PASAPORTE' },
		{ label: 'NIT', name: 'NIT' },
		{ label: 'RUT', name: 'RUT' },
		{ label: 'TI', name: 'TI' },
		{ label: 'NUIP', name: 'NUIP' },
		{ label: 'DNI', name: 'DNI' },
		{ label: 'OTROS', name: 'OTROS' }
	];

	const genderItem = [
		{ label: 'Masculino', name: 'M' },
		{ label: 'Femenino', name: 'F' },
		{ label: 'Otro', name: 'O' }
	];

	const handleCheckIdentificationNumber = async (identificationNumber: string) => {
		const action = await dispatch(checkIdentificationNumber(identificationNumber));
		if (checkIdentificationNumber.fulfilled.match(action)) {
			const check = action.payload;
			if (check.exist) {
				setExistThird(true);
				setThirdFound(check.thirdId);
			}
		}
	};

	useEffect(() => {
		if (identification && thirdId === 'new') {
			handleCheckIdentificationNumber(identification);
		}
	}, [identification]);

	const handleAssignThird = async (thirdId: number) => {
		const action = await dispatch(assignThird(thirdId));
		if (assignThird.fulfilled.match(action)) {
			navigate('/records/thirds');
		} else {
			dispatch(
				showMessage({
					message: 'Ocurrió un error al asignar el panel, por favor intente nuevamente.',
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left'
					},
					variant: 'error'
				})
			);
		}
	};

	return (
		<>
			{existThird ? (
				<Button
					variant="contained"
					color="secondary"
					className="mb-16"
					onClick={() => {
						handleAssignThird(thirdFound);
					}}
				>
					Ya existe el panel, haz clic para asignar
				</Button>
			) : null}
			<Controller
				name="typeId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="typeId"
						className="mt-8 mb-16"
						options={thirdTypes || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
						value={thirdTypes.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Tipo panel"
								required
								error={!!errors.typeId}
								helperText={errors?.typeId?.message as string}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="typeIdentification"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="typeIdentification"
						className="mt-8 mb-16"
						autoFocus
						options={typeIdentificationItem}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => (data ? field.onChange(data.name) : field.onChange(data))}
						value={typeIdentificationItem.find((item) => item.name === field.value) || null}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								required
								label="Tipo de identificación"
								error={!!errors.typeIdentification}
								helperText={errors?.typeIdentification?.message as string}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="identification"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Identificación"
						id="identification"
						variant="outlined"
						fullWidth
						error={!!errors.identification}
						helperText={errors?.identification?.message as string}
					/>
				)}
			/>

			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Nombre"
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			{typeId !== 3 ? (
				<Controller
					name="additionalName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							label={typeId === 2 ? 'Nombre Administrador' : 'Apellidos'}
							id="additionalName"
							required={typeId === 1}
							variant="outlined"
							fullWidth
							error={!!errors.additionalName}
							helperText={errors?.additionalName?.message as string}
						/>
					)}
				/>
			) : null}

			{typeId === 1 ? (
				<Controller
					name="gender"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="gender"
							className="mt-8 mb-16"
							autoFocus
							options={genderItem}
							getOptionLabel={(option) => option.label}
							onChange={(_, data) => (data ? field.onChange(data.name) : field.onChange(data))}
							value={genderItem.find((item) => item.name === field.value) || null}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									required
									label="Género"
									error={!!errors.gender}
									helperText={errors?.gender?.message as string}
								/>
							)}
						/>
					)}
				/>
			) : null}

			<Controller
				name="birthday"
				control={control}
				render={({ field }) => (
					<DatePicker
						{...field}
						className="mt-8 mb-16"
						value={new Date(field.value as string)}
						format="dd-MM"
						maxDate={maxDate}
						slotProps={{
							textField: {
								id: 'birthday',
								label: 'Fecha de nacimiento',
								InputLabelProps: {
									shrink: true
								},
								fullWidth: true,
								variant: 'outlined',
								error: !!errors.birthday,
								helperText: errors?.birthday?.message as string
							},
							inputAdornment: {
								position: 'start',
								children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
							}
						}}
					/>
				)}
			/>

			<Button
				variant="contained"
				color="primary"
				size="small"
				className="mb-16 mr-5"
				onClick={() => {
					setTabValue(1);
				}}
			>
				Siguiente
			</Button>
		</>
	);
}

export default BasicInfoTab;
