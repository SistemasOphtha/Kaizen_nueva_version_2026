import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useAppDispatch } from 'app/store';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';
import * as yup from 'yup';
import _ from '@lodash';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import { useEffect } from 'react';
// import { UserType } from 'app/store/user';
import jwtService from '../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Debes ingresar un correo electrónico válido')
		.required('Debes ingresar un correo electrónico')
});

const defaultValues = {
	email: ''
};

/**
 * The sign in page.
 */
function ResetPasswordPage() {
	const dispatch = useAppDispatch();
	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	// useEffect(() => {
	// 	setValue('email', '', { shouldDirty: true, shouldValidate: true });
	// 	setValue('password', '', { shouldDirty: true, shouldValidate: true });
	// }, [setValue]);

	function onSubmit({ email }: InferType<typeof schema>) {
		jwtService
			.resetPassword(email)
			.then((message: string) => {
				// eslint-disable-next-line no-console
				console.info(message);
				dispatch(
					showMessage({
						message,
						autoHideDuration: 6000,
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'left'
						},
						variant: 'success'
					})
				);

				// No need to do anything, user data will be set at app/auth/AuthContext
			})
			.catch((_errors: { type: 'email' | `root.${string}` | 'root'; message: string }[]) => {
				_errors.forEach((error) => {
					setError(error.type, {
						type: 'email',
						message: error.message
					});
				});
			});
	}

	return (
		// <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
		// 	<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
		// 		<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
		// 			<img
		// 				className="w-56 rounded-lg"
		// 				src="assets/images/logo/ophtha.jpg"
		// 				alt="logo"
		// 			/>

		// 			<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
		// 				Iniciar sesión
		// 			</Typography>

		// 			<form
		// 				name="loginForm"
		// 				noValidate
		// 				className="mt-32 flex w-full flex-col justify-center"
		// 				onSubmit={handleSubmit(onSubmit)}
		// 			>
		// 				<Controller
		// 					name="email"
		// 					control={control}
		// 					render={({ field }) => (
		// 						<TextField
		// 							{...field}
		// 							className="mb-24"
		// 							label="Correo electrónico"
		// 							autoFocus
		// 							type="email"
		// 							error={!!errors.email}
		// 							helperText={errors?.email?.message}
		// 							variant="outlined"
		// 							required
		// 							fullWidth
		// 						/>
		// 					)}
		// 				/>

		// 				<Controller
		// 					name="password"
		// 					control={control}
		// 					render={({ field }) => (
		// 						<TextField
		// 							{...field}
		// 							className="mb-24"
		// 							label="Contraseña"
		// 							type="password"
		// 							error={!!errors.password}
		// 							helperText={errors?.password?.message}
		// 							variant="outlined"
		// 							required
		// 							fullWidth
		// 						/>
		// 					)}
		// 				/>

		// 				<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
		// 					<Controller
		// 						name="remember"
		// 						control={control}
		// 						render={({ field }) => (
		// 							<FormControl>
		// 								<FormControlLabel
		// 									label="Recuérdame"
		// 									control={
		// 										<Checkbox
		// 											size="small"
		// 											{...field}
		// 										/>
		// 									}
		// 								/>
		// 							</FormControl>
		// 						)}
		// 					/>

		// 					{/* <Link
		// 						className="text-md font-medium"
		// 						to="/pages/auth/forgot-password"
		// 					>
		// 						Olvido la contraseña?
		// 					</Link> */}
		// 				</div>

		// 				<Button
		// 					variant="contained"
		// 					color="secondary"
		// 					className=" mt-16 w-full"
		// 					aria-label="Sign in"
		// 					disabled={_.isEmpty(dirtyFields) || !isValid}
		// 					type="submit"
		// 					size="large"
		// 				>
		// 					Iniciar sesión
		// 				</Button>
		// 			</form>
		// 		</div>
		// 	</Paper>

		// 	<Box
		// 		className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
		// 		sx={{ backgroundColor: 'primary.main' }}
		// 	>
		// 		<svg
		// 			className="pointer-events-none absolute inset-0"
		// 			viewBox="0 0 960 540"
		// 			width="100%"
		// 			height="100%"
		// 			preserveAspectRatio="xMidYMax slice"
		// 			xmlns="http://www.w3.org/2000/svg"
		// 		>
		// 			<Box
		// 				component="g"
		// 				sx={{ color: 'primary.light' }}
		// 				className="opacity-20"
		// 				fill="none"
		// 				stroke="currentColor"
		// 				strokeWidth="100"
		// 			>
		// 				<circle
		// 					r="234"
		// 					cx="196"
		// 					cy="23"
		// 				/>
		// 				<circle
		// 					r="234"
		// 					cx="790"
		// 					cy="491"
		// 				/>
		// 			</Box>
		// 		</svg>
		// 		<Box
		// 			component="svg"
		// 			className="absolute -right-64 -top-64 opacity-20"
		// 			sx={{ color: 'primary.light' }}
		// 			viewBox="0 0 220 192"
		// 			width="220px"
		// 			height="192px"
		// 			fill="none"
		// 		>
		// 			<defs>
		// 				<pattern
		// 					id="837c3e70-6c3a-44e6-8854-cc48c737b659"
		// 					x="0"
		// 					y="0"
		// 					width="20"
		// 					height="20"
		// 					patternUnits="userSpaceOnUse"
		// 				>
		// 					<rect
		// 						x="0"
		// 						y="0"
		// 						width="4"
		// 						height="4"
		// 						fill="currentColor"
		// 					/>
		// 				</pattern>
		// 			</defs>
		// 			<rect
		// 				width="220"
		// 				height="192"
		// 				fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
		// 			/>
		// 		</Box>

		// 		<div className="relative z-10 w-full max-w-2xl">
		// 			<div className="text-7xl font-bold leading-none text-gray-100">
		// 				<div>¡Hoy mejor que ayer, mañana mejor que hoy!</div>
		// 			</div>
		// 			<div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
		// 				"Abraza el poder del Kaizen en tu vida: cada pequeño paso hacia la mejora continua suma, y con
		// 				dedicación constante, transformarás tus sueños en logros duraderos."
		// 			</div>
		// 		</div>
		// 	</Box>
		// </div>
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
			<Paper className="min-h-full w-full rounded-0 px-16 py-32 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow">
				<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<img
						className="w-48"
						src="assets/images/logo/ophtha.jpg"
						alt="logo"
					/>

					<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
						¿Has olvidado tu contraseña?
					</Typography>
					<div className="mt-2 flex items-baseline font-medium">
						<Typography>Complete el formulario para restablecer su contraseña</Typography>
					</div>

					<form
						name="registerForm"
						noValidate
						className="mt-32 flex w-full flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Email"
									type="email"
									error={!!errors.email}
									helperText={errors?.email?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<Button
							variant="contained"
							color="secondary"
							className=" mt-4 w-full"
							aria-label="Register"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							type="submit"
							size="large"
						>
							Recuperar contraseña
						</Button>

						<Typography
							className="mt-32 text-md font-medium"
							color="text.secondary"
						>
							<span>volver a</span>
							<Link
								className="ml-4"
								to="/sign-in"
							>
								Iniciar sesión
							</Link>
						</Typography>
					</form>
				</div>
			</Paper>
		</div>
	);
}

export default ResetPasswordPage;
