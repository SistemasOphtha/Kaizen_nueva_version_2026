import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Link, useNavigate } from 'react-router-dom';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import ConfirmDialog from 'app/shared-components/ConfirmDialog';
import { selectUser } from 'app/store/user/userSlice';
import { removeThird, addThird, updateThird } from '../store/thirdSlice';
import { ThirdType } from '../types/ThirdType';

/**
 * The third header.
 */
function ThirdHeader() {
	const dispatch = useAppDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const [isNewVisit, setIsNewVisit] = useState<boolean>(true);
	const [openDialog, setOpenDialog] = useState(false);

	const { role } = useAppSelector(selectUser);

	const theme = useTheme();
	const navigate = useNavigate();

	const { id, name, additionalName, identification, typeIdentification } = watch() as ThirdType;

	useEffect(() => {
		if (id === 0) {
			setIsNewVisit(true);
		} else {
			setIsNewVisit(false);
		}
	}, []);

	function handleSaveThird() {
		if (id === 0) {
			// Add
			dispatch(addThird(getValues() as ThirdType)).then((response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const status = response.meta.requestStatus as string;
				if (status === 'rejected') {
					dispatch(
						showMessage({
							message: 'Error al guardar el panel',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'error'
						})
					);
				} else {
					dispatch(
						showMessage({
							message: 'Panel guardado exitosamente',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'success'
						})
					);
					navigate('/records/thirds');
				}
			});
		} else {
			// Update
			dispatch(updateThird(getValues() as ThirdType)).then((response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const status = response.meta.requestStatus as string;
				if (status === 'rejected') {
					dispatch(
						showMessage({
							message: 'Error al guardar el panel',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'error'
						})
					);
				} else {
					dispatch(
						showMessage({
							message: 'Panel guardado exitosamente',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'success'
						})
					);
					navigate('/records/thirds');
				}
			});
		}
	}

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	function handleConfirmThird() {
		handleCloseDialog();
		handleRemoveThird();
	}

	function handleRemoveThird() {
		dispatch(removeThird(id.toString())).then((response) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (response.meta.requestStatus === 'rejected') {
				dispatch(
					showMessage({
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
						message: response.payload.response.data.message,
						autoHideDuration: 6000,
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'left'
						},
						variant: 'error'
					})
				);
			} else {
				navigate('/records/thirds');
			}
		});
	}

	// function handleDesassignThird() {
	// 	dispatch(unassignThird(id)).then(() => {
	// 		navigate('/records/thirds');
	// 	});
	// }

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
			<div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/records/thirds"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Paneles</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'Nuevo panel'} {additionalName || ''}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							{typeIdentification || ''} {identification || ''}
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{!isNewVisit && role.includes('Administrador') && (
					<FuseAuthorization
						userRole={['Administrador']}
						loginRedirectUrl="/"
					>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleOpenDialog}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							Eliminar
						</Button>
					</FuseAuthorization>
				)}
				{/* {!isNewVisit && role.includes('Administrador') && (
					<FuseAuthorization
						userRole={['Representante']}
						loginRedirectUrl="/"
					>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="warning"
							onClick={() => handleDesassignThird()}
							startIcon={
								<FuseSvgIcon className="hidden sm:flex">heroicons-outline:folder-remove</FuseSvgIcon>
							}
						>
							Desasignar
						</Button>
					</FuseAuthorization>
				)} */}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSaveThird}
				>
					{isNewVisit ? 'Crear' : 'Guardar'}
				</Button>
			</motion.div>
			<ConfirmDialog
				open={openDialog}
				handleConfirm={handleConfirmThird}
				handleClose={handleCloseDialog}
			/>
		</div>
	);
}

export default ThirdHeader;
