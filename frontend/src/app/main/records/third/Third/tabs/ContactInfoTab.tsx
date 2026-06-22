import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
// import { ThirdType } from '../../types/ThirdType';

/**
 * The basic info tab.
 */

interface Props {
	setTabValue: (value: number) => void;
}

function ContactInfoTab({ setTabValue }: Props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	// const { typeIdentification } = watch() as ThirdType;

	return (
		<div>
			<Controller
				name="address"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Dirección"
						autoFocus
						id="address"
						variant="outlined"
						fullWidth
						error={!!errors.address}
						helperText={errors?.address?.message as string}
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

			<Controller
				name="city"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Ciudad"
						id="city"
						variant="outlined"
						fullWidth
						error={!!errors.city}
						helperText={errors?.city?.message as string}
					/>
				)}
			/>

			<Button
				variant="contained"
				color="primary"
				size="small"
				className="mb-16 mr-5"
				onClick={() => {
					setTabValue(0);
				}}
			>
				Anterior
			</Button>

			<Button
				variant="contained"
				color="primary"
				size="small"
				className="mb-16"
				onClick={() => {
					setTabValue(2);
				}}
			>
				Siguiente
			</Button>
		</div>
	);
}

export default ContactInfoTab;
