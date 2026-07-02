import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

function SecurityTab() {
	const methods = useFormContext();
	const { getValues } = methods;
	const [newPassword, setNewPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const userId = getValues('id');

	const handlePasswordChange = async () => {
		if (!newPassword || newPassword.length < 6) {
			dispatch(
				showMessage({
					message: 'La contraseña debe tener al menos 6 caracteres',
					variant: 'error'
				})
			);
			return;
		}

		if (!userId) {
			dispatch(
				showMessage({
					message: 'Debes guardar el usuario primero',
					variant: 'error'
				})
			);
			return;
		}

		setLoading(true);
		try {
			await axios.post(`/api/users/${userId}/admin-change-password`, { newPassword });
			dispatch(
				showMessage({
					message: 'Contraseña actualizada correctamente',
					variant: 'success'
				})
			);
			setNewPassword('');
		} catch (error) {
			dispatch(
				showMessage({
					message: 'Error al cambiar la contraseña',
					variant: 'error'
				})
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Typography className="mb-24 font-medium text-14">
				Gestión de Seguridad (Solo Administrador)
			</Typography>

			<div className="flex flex-col gap-16 max-w-sm">
				<TextField
					label="Nueva Contraseña"
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					fullWidth
					variant="outlined"
					disabled={!userId}
				/>
				<Button
					variant="contained"
					color="secondary"
					onClick={handlePasswordChange}
					disabled={loading || !newPassword || !userId}
				>
					{loading ? 'Actualizando...' : 'Forzar cambio de clave'}
				</Button>
			</div>
		</div>
	);
}

export default SecurityTab;
