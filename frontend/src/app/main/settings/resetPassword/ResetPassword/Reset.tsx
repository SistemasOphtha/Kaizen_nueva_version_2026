import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { selectUser, updateUserPassword, setUser } from 'app/store/user/userSlice';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	password: yup.string().required('Por favor, introduzca su contraseña actual.'),
	newPassword: yup
		.string()
		.required('Por favor, introduzca su nueva contraseña.')
		.min(8, 'La contraseña debe tener al menos 8 caracteres.'),
	newPasswordConfirm: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
});

const defaultValues = {
	password: '',
	newPassword: '',
	newPasswordConfirm: ''
};

/**
 * The classic reset password page.
 */
function Reset() {
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});
	const user = useSelector(selectUser);
	const dispatch = useAppDispatch();

	const { isValid, dirtyFields, errors } = formState;

	const [qrCode, setQrCode] = useState<string | null>(null);
	const [secret2FA, setSecret2FA] = useState<string | null>(null);
	const [token2FA, setToken2FA] = useState('');
	const [setupMode, setSetupMode] = useState(false);
	const [loading2FA, setLoading2FA] = useState(false);
	const [error2FA, setError2FA] = useState<string | null>(null);
	const [success2FA, setSuccess2FA] = useState<string | null>(null);

	const handleSetup2FA = async () => {
		setLoading2FA(true);
		setError2FA(null);
		setSuccess2FA(null);
		try {
			const response = await axios.post('/api/auth/2fa/setup');
			setQrCode(response.data.qrCode);
			setSecret2FA(response.data.secret);
			setSetupMode(true);
		} catch (err: any) {
			setError2FA(err.response?.data?.message || 'Error al iniciar la configuración de 2FA.');
		} finally {
			setLoading2FA(false);
		}
	};

	const handleVerify2FA = async () => {
		if (!token2FA || token2FA.length !== 6) {
			setError2FA('El código debe ser de 6 dígitos.');
			return;
		}
		setLoading2FA(true);
		setError2FA(null);
		try {
			await axios.post('/api/auth/2fa/verify', {
				token: token2FA,
				secret: secret2FA
			});
			setSuccess2FA('¡Doble factor de autenticación activado con éxito!');
			setSetupMode(false);
			setQrCode(null);
			setSecret2FA(null);
			setToken2FA('');
			
			dispatch(setUser({
				...user,
				data: {
					...user.data,
					twoFactorEnabled: true
				}
			}));
		} catch (err: any) {
			setError2FA(err.response?.data?.message || 'Código de verificación inválido. Intente nuevamente.');
		} finally {
			setLoading2FA(false);
		}
	};

	const handleDisable2FA = async () => {
		if (!window.confirm('¿Está seguro de que desea desactivar el Doble Factor de Autenticación? Su cuenta será menos segura.')) {
			return;
		}
		setLoading2FA(true);
		setError2FA(null);
		setSuccess2FA(null);
		try {
			await axios.post('/api/auth/2fa/disable');
			setSuccess2FA('Doble factor de autenticación desactivado.');
			
			dispatch(setUser({
				...user,
				data: {
					...user.data,
					twoFactorEnabled: false
				}
			}));
		} catch (err: any) {
			setError2FA(err.response?.data?.message || 'Error al desactivar 2FA.');
		} finally {
			setLoading2FA(false);
		}
	};

	const handleCancelSetup = () => {
		setSetupMode(false);
		setQrCode(null);
		setSecret2FA(null);
		setToken2FA('');
		setError2FA(null);
	};

	function onSubmit({ password, newPassword, newPasswordConfirm }: yup.InferType<typeof schema>) {
		dispatch(updateUserPassword({ email: user.data.email, password, newPassword, newPasswordConfirm }));
		reset(defaultValues);
	}

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center p-16 sm:p-32">
			<Paper className="min-h-full w-full max-w-5xl rounded-0 px-16 py-32 sm:min-h-auto sm:rounded-2xl sm:p-48 sm:shadow">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-48 w-full">
					{/* COLUMNA IZQUIERDA: CONTRASEÑA */}
					<div className="flex flex-col">
						<Typography className="text-4xl font-extrabold leading-tight tracking-tight">
							Cambio de Contraseña
						</Typography>
						<Typography className="font-medium mt-8">Ingrese su contraseña actual y la nueva contraseña.</Typography>

						<form
							name="registerForm"
							noValidate
							className="mt-32 flex w-full flex-col justify-center"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Contraseña (Actual)"
										type="password"
										error={!!errors.password}
										helperText={errors?.password?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="newPassword"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Contraseña (Nueva)"
										type="password"
										error={!!errors.newPassword}
										helperText={errors?.newPassword?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Controller
								name="newPasswordConfirm"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Contraseña (Confirmar)"
										type="password"
										error={!!errors.newPasswordConfirm}
										helperText={errors?.newPasswordConfirm?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>

							<Button
								variant="contained"
								color="secondary"
								className="mt-4 w-full"
								aria-label="Register"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								size="large"
							>
								Cambiar Contraseña
							</Button>
						</form>
					</div>

					{/* COLUMNA DERECHA: 2FA */}
					<div className="flex flex-col md:border-l-1 md:pl-48 pt-32 md:pt-0 border-t-1 md:border-t-0 border-slate-200">
						<Typography className="text-2xl font-extrabold leading-tight tracking-tight">
							Seguridad (2FA)
						</Typography>
						<Typography className="font-medium mb-16 mt-8">
							Doble Factor de Autenticación (2FA)
						</Typography>

						{error2FA && <Alert severity="error" className="mb-16">{error2FA}</Alert>}
						{success2FA && <Alert severity="success" className="mb-16">{success2FA}</Alert>}

						{user?.data?.twoFactorEnabled ? (
							<div>
								<Alert severity="success" className="mb-16">
									El Doble Factor de Autenticación (2FA) se encuentra <strong>ACTIVADO</strong> en su cuenta.
								</Alert>
								<Button
									variant="outlined"
									color="error"
									onClick={handleDisable2FA}
									disabled={loading2FA}
									fullWidth
								>
									{loading2FA ? 'Desactivando...' : 'Desactivar 2FA'}
								</Button>
							</div>
						) : setupMode ? (
							<div className="flex flex-col items-center">
								<Typography className="text-14 text-text-secondary mb-16 text-center">
									Escanee este código QR con Google Authenticator u otra app de 2FA e ingrese el código de 6 dígitos generado.
								</Typography>
								{qrCode && (
									<img
										src={qrCode}
										alt="Código QR 2FA"
										className="w-200 h-200 mb-16 border-1 border-gray-300 rounded-8"
									/>
								)}
								<Typography className="text-12 font-bold mb-16 select-all">
									Clave secreta: {secret2FA}
								</Typography>
								<TextField
									label="Código de 6 dígitos"
									type="text"
									value={token2FA}
									onChange={(e) => setToken2FA(e.target.value.replace(/\D/g, '').slice(0, 6))}
									variant="outlined"
									required
									fullWidth
									className="mb-16"
									inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '20px', letterSpacing: '8px' } }}
								/>
								<div className="flex w-full gap-12">
									<Button
										variant="outlined"
										onClick={handleCancelSetup}
										className="flex-1"
										disabled={loading2FA}
									>
										Cancelar
									</Button>
									<Button
										variant="contained"
										color="secondary"
										onClick={handleVerify2FA}
										className="flex-1"
										disabled={loading2FA || token2FA.length !== 6}
									>
										{loading2FA ? 'Verificando...' : 'Activar 2FA'}
									</Button>
								</div>
							</div>
						) : (
							<div>
								<Typography className="text-14 text-text-secondary mb-16">
									Proteja su cuenta exigiendo un código adicional de 6 dígitos en cada inicio de sesión.
								</Typography>
								<Button
									variant="contained"
									color="secondary"
									onClick={handleSetup2FA}
									disabled={loading2FA}
									fullWidth
								>
									{loading2FA ? 'Generando...' : 'Configurar 2FA'}
								</Button>
							</div>
						)}
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default Reset;
