import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/user/userSlice';
import { getConfigs } from '../store/configsSlice';
import { updateConfig } from '../store/configSlice';
import { ConfigsType, ConfigType } from '../types/ConfigType';

/**
 * Componente de configuración general
 */

function Config() {
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange'
	});
	const user = useSelector(selectUser);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const [configs, setConfigs] = useState<ConfigsType>();
	const dispatch = useAppDispatch();

	const { isValid, dirtyFields } = formState;

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const [closingMonth, setClosingMonth] = useState(false);
	const [closeResult, setCloseResult] = useState<{
		success: boolean;
		message: string;
		count?: number;
	} | null>(null);

	const handleCloseMonth = async () => {
		setClosingMonth(true);
		setCloseResult(null);
		setIsSuccess(false);
		setIsError(false);
		try {
			const response = await axios.post('/api/configs/close-month');
			setCloseResult({
				success: true,
				message: response.data.message || 'Cierre completado.',
				count: response.data.justificationsCreated
			});
		} catch (error: any) {
			console.error(error);
			setCloseResult({
				success: false,
				message: error.response?.data?.message || 'Error al ejecutar el cierre de mes.'
			});
		} finally {
			setClosingMonth(false);
		}
	};

	useEffect(() => {
		dispatch(getConfigs()).then((action) => {
			setConfigs(action.payload as ConfigsType);
		});
	}, [dispatch]);

	function onSubmit(data: [string, string]) {
		const jsonData = Object.keys(data).map((key) => ({
			name: key,
			id: configs.find((config) => config.name === key).id,
			value: data[key] as string,
			type: configs.find((config) => config.name === key).type,
			label: configs.find((config) => config.name === key).label
		})) as ConfigType[];
		dispatch(updateConfig(jsonData))
			.then(() => {
				setIsSuccess(true);
			})
			.catch(() => {
				setIsError(true);
			});
	}

	return (
		<div className="w-full">
			{closeResult && (
				<Alert
					severity={closeResult.success ? 'success' : 'error'}
					className="mb-24"
				>
					{closeResult.message} {closeResult.count !== undefined && `Se crearon ${closeResult.count} justificaciones pendientes.`}
				</Alert>
			)}
			{isError && (
				<Alert
					severity="error"
					className="mb-24"
				>
					Error al actualizar la configuración!
				</Alert>
			)}
			{isSuccess && (
				<Alert
					severity="success"
					className="mb-24"
				>
					Configuración actualizada!
				</Alert>
			)}

			<Paper className="p-24 mb-24">
				<Typography className="text-xl font-medium mb-24">Configuración General</Typography>

				<form
					name="registerForm"
					noValidate
					className="flex w-full flex-col justify-center"
					onSubmit={handleSubmit(onSubmit)}
				>
					{configs?.map((config: ConfigType) => (
						<Controller
							key={config.name}
							name={config.name}
							control={control}
							defaultValue={config.value}
							render={({ field }) => (
								<TextField
									className="mb-24"
									label={config.label}
									type="text"
									value={field.value as string}
									onChange={field.onChange}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					))}

					<Button
						variant="contained"
						color="secondary"
						className="mt-4 w-full"
						aria-label="Register"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						type="submit"
						size="large"
					>
						Guardar
					</Button>
				</form>
			</Paper>

			{user?.role?.includes('Administrador') && (
				<Paper className="p-24 mb-24 flex flex-col">
					<Typography className="text-xl font-medium mb-12">Cierre de Mes e Impactos</Typography>
					<Typography className="text-14 text-text-secondary mb-24">
						Esta operación compara las visitas de cada representante con las metas de impacto de sus médicos asignados durante el mes calendario anterior. Generará de forma automática justificaciones pendientes para las visitas no cumplidas.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						className="w-full md:w-auto self-start"
						onClick={handleCloseMonth}
						disabled={closingMonth}
						size="large"
					>
						{closingMonth ? 'Procesando Cierre...' : 'Ejecutar Cierre de Mes'}
					</Button>
				</Paper>
			)}
		</div>
	);
}

export default Config;
