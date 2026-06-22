import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { InferType } from 'yup';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { UserType } from 'app/store/user';
import jwtService from '../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup
		.string()
		.email('Debes ingresar un correo electrónico válido')
		.required('Debes ingresar un correo electrónico'),
	password: yup
		.string()
		.required('Por favor, introduzca su contraseña.')
		.min(4, 'La contraseña es demasiado corta; debe tener al menos 4 caracteres.'),
	remember: yup.boolean()
});

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

/**
 * The sign in page.
 */
function SignInPage() {
	const [require2FA, setRequire2FA] = useState(false);
	const [userIdFor2FA, setUserIdFor2FA] = useState<number | null>(null);
	const [totpToken, setTotpToken] = useState('');
	const [totpError, setTotpError] = useState('');

	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	function onSubmit({ email, password }: InferType<typeof schema>) {
		jwtService
			.signInWithEmailAndPassword(email, password)
			.then((res: any) => {
				if (res && res.require2FA) {
					setRequire2FA(true);
					setUserIdFor2FA(res.userId);
				}
			})
			.catch((_errors: { type: 'email' | 'password' | `root.${string}` | 'root'; message: string }[]) => {
				_errors.forEach((error) => {
					setError(error.type, {
						type: 'manual',
						message: error.message
					});
				});
			});
	}

	function handleVerify2FA(e: React.FormEvent) {
		e.preventDefault();
		if (!totpToken || totpToken.length !== 6) {
			setTotpError('El código debe ser de 6 dígitos');
			return;
		}
		if (userIdFor2FA) {
			jwtService
				.loginVerify2FA(userIdFor2FA, totpToken)
				.then((user: any) => {
					console.info(user);
				})
				.catch((_errors: any) => {
					const msg = _errors?.[0]?.message || 'Código incorrecto. Inténtelo de nuevo.';
					setTotpError(msg);
				});
		}
	}

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
				<div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					<img
						className="w-56 rounded-lg"
						src="assets/images/logo/ophtha.jpg"
						alt="logo"
					/>

					<Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
						{require2FA ? 'Verificación 2FA' : 'Iniciar sesión'}
					</Typography>

					{require2FA ? (
						<form
							name="verify2FAForm"
							noValidate
							className="mt-32 flex w-full flex-col justify-center"
							onSubmit={handleVerify2FA}
						>
							<Typography className="text-md text-text.secondary mb-16">
								Ingresa el código de 6 dígitos de tu aplicación de autenticación para confirmar tu identidad.
							</Typography>

							<TextField
								className="mb-24"
								label="Código de Seguridad"
								autoFocus
								type="text"
								inputProps={{ maxLength: 6, style: { letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' } }}
								value={totpToken}
								onChange={(e) => {
									setTotpToken(e.target.value.replace(/\D/g, ''));
									setTotpError('');
								}}
								error={!!totpError}
								helperText={totpError}
								variant="outlined"
								required
								fullWidth
							/>

							<Button
								variant="contained"
								color="secondary"
								className="mt-16 w-full"
								aria-label="Verify 2FA"
								disabled={totpToken.length !== 6}
								type="submit"
								size="large"
							>
								Verificar y Entrar
							</Button>

							<Button
								variant="text"
								className="mt-16 w-full"
								onClick={() => {
									setRequire2FA(false);
									setUserIdFor2FA(null);
									setTotpToken('');
									setTotpError('');
								}}
							>
								Regresar al inicio de sesión
							</Button>
						</form>
					) : (
						<form
							name="loginForm"
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
										label="Correo electrónico"
										autoFocus
										type="email"
										error={!!errors.email}
										helperText={errors?.email?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Contraseña"
										type="password"
										error={!!errors.password}
										helperText={errors?.password?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
								<Controller
									name="remember"
									control={control}
									render={({ field }) => (
										<FormControl>
											<FormControlLabel
												label="Recuérdame"
												control={
													<Checkbox
														size="small"
														{...field}
													/>
												}
											/>
										</FormControl>
									)}
								/>

								<Link
									className="text-md font-medium"
									to="/reset-password"
								>
									Olvido la contraseña?
								</Link>
							</div>

							<Button
								variant="contained"
								color="secondary"
								className=" mt-16 w-full"
								aria-label="Sign in"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								size="large"
							>
								Iniciar sesión
							</Button>
						</form>
					)}
				</div>
			</Paper>

			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: 'primary.main' }}
			>
				<svg
					className="pointer-events-none absolute inset-0"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: 'primary.light' }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle
							r="234"
							cx="196"
							cy="23"
						/>
						<circle
							r="234"
							cx="790"
							cy="491"
						/>
					</Box>
				</svg>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{ color: 'primary.light' }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>

				<div className="relative z-10 w-full max-w-2xl">
					<div className="text-7xl font-bold leading-none text-gray-100">
						<div>¡Hoy mejor que ayer, mañana mejor que hoy!</div>
					</div>
					<div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
						"Abraza el poder del Kaizen en tu vida: cada pequeño paso hacia la mejora continua suma, y con
						dedicación constante, transformarás tus sueños en logros duraderos."
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignInPage;
