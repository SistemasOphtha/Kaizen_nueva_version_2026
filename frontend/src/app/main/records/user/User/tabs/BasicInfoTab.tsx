import TextField from '@mui/material/TextField';
// import { useAppSelector } from 'app/store';
// import moment from 'moment';
// import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
// import { ThirdType } from '../../types/ThirdType';
// import { selectThird } from '../../store/thirdSlice';

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
				name="firstName"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Nombre"
						autoFocus
						id="firstName"
						variant="outlined"
						fullWidth
						error={!!errors.firstName}
						helperText={errors?.firstName?.message as string}
					/>
				)}
			/>

			<Controller
				name="lastName"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Apellido"
						id="lastName"
						variant="outlined"
						fullWidth
						error={!!errors.lastName}
						helperText={errors?.lastName?.message as string}
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Correo electrónico"
						id="email"
						variant="outlined"
						fullWidth
						error={!!errors.email}
						helperText={errors?.email?.message as string}
					/>
				)}
			/>

			<Controller
				name="phone"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Teléfono"
						id="phone"
						variant="outlined"
						fullWidth
						error={!!errors.phone}
						helperText={errors?.phone?.message as string}
					/>
				)}
			/>

			<Controller
				name="mobile"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Celular"
						id="mobile"
						variant="outlined"
						fullWidth
						error={!!errors.mobile}
						helperText={errors?.mobile?.message as string}
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
