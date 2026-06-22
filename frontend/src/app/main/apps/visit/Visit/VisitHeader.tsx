import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Link, useNavigate } from 'react-router-dom';
// import FuseAuthorization from '@fuse/core/FuseAuthorization';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import ConfirmDialog from 'app/shared-components/ConfirmDialog';
import { removeVisit, addVisit, updateVisit } from '../store/visitSlice';
// import { selectUser } from 'app/store/user/userSlice';
import { selectThirds } from '../../../records/third/store/thirdsSlice';
import { VisitType } from '../types/VisitType';
import { ThirdType } from '../../../records/third/types/ThirdType';

/**
 * The visit header.
 */
function VisitHeader() {
	const dispatch = useAppDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const [isNewVisit, setIsNewVisit] = useState<boolean>(true);
	const [openDialog, setOpenDialog] = useState(false);

	// const { role } = useAppSelector(selectUser);

	const theme = useTheme();
	const navigate = useNavigate();

	const { id, thirdId } = watch() as VisitType;

	const [selectedThird, setSelectedThird] = useState({} as ThirdType);

	const thirds: ThirdType[] = useAppSelector(selectThirds);

	useEffect(() => {
		if (thirdId) {
			const third = thirds.find((item) => item.id === thirdId);
			setSelectedThird(third);
		}
	}, [thirdId]);

	useEffect(() => {
		if (id === 0) {
			setIsNewVisit(true);
		} else {
			setIsNewVisit(false);
		}
	}, []);

	function handleSaveVisit() {
		const saveVisitWithCoords = (coords: { latitude: number; longitude: number } | null) => {
			const values = {
				...getValues(),
				latitude: coords ? coords.latitude : null,
				longitude: coords ? coords.longitude : null
			} as VisitType;

			if (id === 0) {
				// Add
				dispatch(addVisit(values)).then((response) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
					const status = response.meta.requestStatus;
					if (status === 'rejected') {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						dispatch(
							showMessage({
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
								message: (response.payload as any)?.data?.message || 'Error al guardar la visita',
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
								message: 'Visita guardada exitosamente',
								autoHideDuration: 6000,
								anchorOrigin: {
									vertical: 'bottom',
									horizontal: 'left'
								},
								variant: 'success'
							})
						);
						navigate('/apps/visits');
					}
				});
			} else {
				// Update
				dispatch(updateVisit(values)).then((response) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					const status = response.meta.requestStatus as string;
					if (status === 'rejected') {
						dispatch(
							showMessage({
								message: 'Error al guardar la visita',
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
								message: 'Visita guardada exitosamente',
								autoHideDuration: 6000,
								anchorOrigin: {
									vertical: 'bottom',
									horizontal: 'left'
								},
								variant: 'success'
							})
						);
						navigate('/apps/visits');
					}
				});
			}
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					saveVisitWithCoords({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
				},
				(error) => {
					console.error('Error fetching geolocation:', error);
					saveVisitWithCoords(null);
				},
				{ timeout: 8000 }
			);
		} else {
			saveVisitWithCoords(null);
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
		handleRemoveVisit();
	}

	function handleRemoveVisit() {
		dispatch(removeVisit(id.toString())).then(() => {
			navigate('/apps/visits');
		});
	}

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
						to="/apps/visits"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Visitas</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{selectedThird?.name || 'Nueva Visita'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Detalles de la visita
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{!isNewVisit && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled
						onClick={handleOpenDialog}
						startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
					>
						Eliminar
					</Button>
				)}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSaveVisit}
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

export default VisitHeader;
