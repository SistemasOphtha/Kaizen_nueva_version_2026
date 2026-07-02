import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { selectUser } from 'app/store/user/userSlice';
import { PortfolioType } from '../../types/UserType';
import ThirdPortfolioItem from './components/ThirdPortfolioItem';
import { approvePanel, desapprovePanel, getUser, approvePanelsBulk, desapprovePanelsBulk } from '../../store/userSlice';
import { assignThirdByAdmin, unassignThirdByAdmin, unassignThirdsByAdminBulk, assignThirdsByAdminBulk } from '../../../third/store/thirdSlice';
import { selectThirds } from '../../../third/store/thirdsSlice';
import { ThirdType } from '../../../third/types/ThirdType';

/**
 * The Portfolio info tab.
 */
function PortfolioInfoTab() {
	const dispatch = useAppDispatch();
	const methods = useFormContext();
	const routeParams = useParams();
	const { watch } = methods;
	// const { errors } = formState;
	const thirds = useAppSelector(selectThirds);

	const portfolios = watch('portfolios') as PortfolioType[];

	const [thirdIds, setThirdIds] = useState<number[]>([]);
	const [selectedPanels, setSelectedPanels] = useState<Record<number, number[]>>({});

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	const approvePanelHandler = (userId: number, panelId: number) => {
		dispatch(approvePanel({ userId, panelId }));
		setTimeout(() => {
			dispatch(getUser(userId.toString()));
		}, 2000);
	};

	const desapprovePanelHandler = (userId: number, panelId: number) => {
		dispatch(desapprovePanel({ userId, panelId }));
		setTimeout(() => {
			dispatch(getUser(userId.toString()));
		}, 2000);
	};

	const unassignPanelHandler = (thirdId: number, userId: number) => {
		dispatch(unassignThirdByAdmin({ thirdId, userId }));
		setTimeout(() => {
			dispatch(getUser(userId.toString()));
		}, 2000);
	};

	const togglePanelSelection = (portfolioId: number, panelId: number) => {
		setSelectedPanels((prev) => {
			const current = prev[portfolioId] || [];
			const exists = current.includes(panelId);
			return {
				...prev,
				[portfolioId]: exists ? current.filter((id) => id !== panelId) : [...current, panelId]
			};
		});
	};

	const toggleSelectAll = (portfolioId: number, panelIds: number[]) => {
		setSelectedPanels((prev) => {
			const current = prev[portfolioId] || [];
			if (current.length === panelIds.length) {
				return { ...prev, [portfolioId]: [] };
			}
			return { ...prev, [portfolioId]: panelIds };
		});
	};

	const handleBulkAction = async (
		portfolioId: number,
		userId: number,
		action: 'approve' | 'desapprove' | 'unassign'
	) => {
		const panelIds = selectedPanels[portfolioId] || [];
		if (!panelIds.length) {
			return;
		}

		if (action === 'approve') {
			await dispatch(approvePanelsBulk({ userId, panelIds }));
		}
		if (action === 'desapprove') {
			await dispatch(desapprovePanelsBulk({ userId, panelIds }));
		}
		if (action === 'unassign') {
			await dispatch(unassignThirdsByAdminBulk({ userId, thirdIds: panelIds }));
		}

		const { userId: routeUserId } = routeParams;
		if (routeUserId) {
			await dispatch(getUser(routeUserId.toString()));
		}

		setSelectedPanels((prev) => ({ ...prev, [portfolioId]: [] }));
	};

	return (
		<div>
			<h2>Portafolios</h2>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
				<Typography
					sx={{ fontSize: 14 }}
					color="text.secondary"
					gutterBottom
				>
					Asignar panel
				</Typography>
				<Autocomplete
					multiple
					style={{ marginTop: '8px' }}
					options={thirds}
					getOptionLabel={(option: ThirdType) =>
						`${option.identification} - ${option.name} ${option.additionalName}`
					}
					onChange={(event, value: ThirdType[]) => {
						setThirdIds(value.map((v) => v.id));
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Seleccionar el panel o paneles a asignar"
						/>
					)}
				/>
				<Button
					variant="contained"
					color="primary"
					disabled={thirdIds.length === 0}
					onClick={async () => {
						const { userId } = routeParams;
						if (userId) {
							await dispatch(assignThirdsByAdminBulk({ thirdIds, userId: Number(userId) }));
							setTimeout(() => {
								dispatch(getUser(userId.toString()));
							}, 2000);
						}
					}}
				>
					Asignar Seleccionados
				</Button>
			</div>
			{portfolios && portfolios.length > 0 && (
				<div>
					{portfolios.map((portf) => (
						<div key={portf.id}>
							<Box sx={{ width: '100%' }}>
								<Card variant="outlined">
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color="text.secondary"
											gutterBottom
										>
											{portf?.name}
										</Typography>
										<Typography
											variant="body2"
											className="mb-2"
										>
											{portf.status ? (
												<Chip
													label="Activo"
													size="small"
													color="success"
												/>
											) : (
												<Chip
													label="Inactivo"
													size="small"
													color="error"
												/>
											)}
										</Typography>
										<div className="flex ">
											<Card
												component={motion.div}
												variants={item}
												className="flex flex-col w-full px-32 pt-24"
											>
												<div className="flex justify-between items-center pb-16">
													<Typography className="text-2xl font-semibold leading-tight">
														Paneles
													</Typography>
													<FormControlLabel
														control={
															<Checkbox
																checked={
																	(selectedPanels[portf.id]?.length || 0) ===
																		(portf.thirds_portfolios?.filter((t) => t.third).length || 0) &&
																	(portf.thirds_portfolios?.filter((t) => t.third).length || 0) > 0
																}
																indeterminate={
																	!!selectedPanels[portf.id]?.length &&
																	(selectedPanels[portf.id]?.length || 0) <
																		(portf.thirds_portfolios?.filter((t) => t.third).length || 0)
																}
																onChange={() =>
																	toggleSelectAll(
																		portf.id,
																		portf.thirds_portfolios?.filter((t) => t.third).map(
																			(t) => t.third.id
																		) || []
																	)
																}
															/>
														}
														label="Seleccionar todos"
													/>
												</div>
												{(selectedPanels[portf.id] || []).length > 0 && (
													<div className="flex gap-8 px-16 pb-8">
														<Button
															variant="outlined"
															size="small"
															onClick={() =>
																handleBulkAction(portf.id, portf.userId, 'approve')
															}
														>
															Aprobar seleccionados
														</Button>
														<Button
															variant="outlined"
															size="small"
															onClick={() =>
																handleBulkAction(portf.id, portf.userId, 'desapprove')
															}
														>
															Desaprobar seleccionados
														</Button>
														<Button
															variant="outlined"
															size="small"
															color="error"
															onClick={() =>
																handleBulkAction(portf.id, portf.userId, 'unassign')
															}
														>
															Desasignar seleccionados
														</Button>
													</div>
												)}
												<CardContent className="p-0">
													<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
														{portf?.thirds_portfolios?.filter((tp) => tp.third).map((thirdPort, index) => {
															const isSelected = (
																selectedPanels[portf.id] || []
															).includes(thirdPort.third.id);
															return (
																<>
																	<ThirdPortfolioItem
																		item={thirdPort}
																		userId={portf.userId}
																		approvePanel={approvePanelHandler}
																		desapprovePanel={desapprovePanelHandler}
																		unassignPanelHandler={unassignPanelHandler}
																		selected={isSelected}
																		onToggleSelected={(panelId) =>
																			togglePanelSelection(portf.id, panelId)
																		}
																		key={thirdPort.id}
																	/>
																	{portf?.thirds_portfolios.length !== index && (
																		<Divider
																			variant="inset"
																			component="li"
																		/>
																	)}
																</>
															);
														})}
													</List>
												</CardContent>
											</Card>
										</div>
									</CardContent>
								</Card>
							</Box>
						</div>
					))}
				</div>
			)}
			{portfolios && portfolios.length === 0 && (
				<div>
					<Typography variant="body2">No hay portafolios asociados a este usuario</Typography>
				</div>
			)}
		</div>
	);
}

export default PortfolioInfoTab;
