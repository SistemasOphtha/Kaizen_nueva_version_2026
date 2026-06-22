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
import { removeWorkplan, addWorkplan, updateWorkplan } from '../store/workplanSlice';
import { selectWorkplans } from '../store/workplansSlice';
import { WorkplanType } from '../types/WorkplanType';
/**
 * The workplan header.
 */
function WorkplanHeader() {
	const dispatch = useAppDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const [isNewWorkplan, setIsNewWorkplan] = useState<boolean>(true);
	const [openDialog, setOpenDialog] = useState(false);

	const theme = useTheme();
	const navigate = useNavigate();

	const { id, userId } = watch() as WorkplanType;

	// eslint-disable-next-line unused-imports/no-unused-vars
	const [selectedWorkplan, setSelectedWorkplan] = useState({} as WorkplanType);

	const workplans: WorkplanType[] = useAppSelector(selectWorkplans);
	useEffect(() => {
		if (userId) {
			const workplan = workplans.find((item) => item.id === userId);
			setSelectedWorkplan(workplan);
		}
	}, [userId]);

	useEffect(() => {
		if (id === 0) {
			setIsNewWorkplan(true);
		} else {
			setIsNewWorkplan(false);
		}
	}, []);

	function handleSaveWorkplan() {
		if (id === 0) {
			// Add
			dispatch(addWorkplan(getValues() as WorkplanType)).then((response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const status = response.meta.requestStatus as string;
				if (status === 'rejected') {
					dispatch(
						showMessage({
							message: 'Error al guardar el plan de trabajo',
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
							message: 'Plan de trabajo guardado exitosamente',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'success'
						})
					);
					navigate('/dashboards/workplans');
				}
			});
		} else {
			// Update
			dispatch(updateWorkplan(getValues() as WorkplanType)).then((response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const status = response.meta.requestStatus as string;
				if (status === 'rejected') {
					dispatch(
						showMessage({
							message: 'Error al guardar el plan de trabajo',
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
							message: 'Plan de trabajo guardado exitosamente',
							autoHideDuration: 6000,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left'
							},
							variant: 'success'
						})
					);
					navigate('/dashboards/workplans');
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
		handleRemoveWorkplan();
	}

	function handleRemoveWorkplan() {
		dispatch(removeWorkplan(id.toString())).then(() => {
			navigate('/dashboards/workplans');
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
						to="/dashboards/workplans"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Plan de trabajo</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{/* {selectedWorkplan?.user?.firstName || 'Nuevo plan de trabajo'} */}
							Plan de trabajo
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Detalles del plan de trabajo
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{!isNewWorkplan && (
					<FuseAuthorization
						userRole={['Administrador']}
						loginRedirectUrl="/"
					>
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
					</FuseAuthorization>
				)}
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSaveWorkplan}
				>
					{isNewWorkplan ? 'Crear' : 'Guardar'}
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

export default WorkplanHeader;
