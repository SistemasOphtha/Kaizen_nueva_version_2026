import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { Many } from 'lodash';
import { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { selectUser } from 'app/store/user/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getThirds, removeThirdsBulk, selectFilteredThirds, selectSearchText } from '../store/thirdsSlice';
import { assignThirdByAdmin } from '../store/thirdSlice';
import ThirdsPartieTableHead from './ThirdsTableHead';
import { ThirdType } from '../types/ThirdType';
import axios from 'axios';

type ProductsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The thirds table.
 */
function ProductsTable(props: ProductsTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const thirds = useAppSelector(selectFilteredThirds);
	const { role, id: userId } = useAppSelector(selectUser);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const searchText = useAppSelector(selectSearchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState<ThirdType[]>(thirds);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [assignDialogOpen, setAssignDialogOpen] = useState(false);
	const [usersList, setUsersList] = useState<any[]>([]);
	const [selectedAssignUser, setSelectedAssignUser] = useState<any>(null);
	const [assigning, setAssigning] = useState(false);
	const [tableOrder, setTableOrder] = useState<{
		direction: 'asc' | 'desc';
		id: string;
	}>({
		direction: 'desc',
		id: ''
	});

	useEffect(() => {
		dispatch(getThirds()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		setData(thirds);
		setPage(0);
	}, [thirds]);

	function handleRequestSort(event: MouseEvent<HTMLSpanElement>, property: string) {
		const newOrder: {
			direction: 'asc' | 'desc';
			id: string;
		} = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			setSelected(data.map((n) => n.id.toString()));
			return;
		}

		setSelected([]);
	}

	const handleBulkDelete = async () => {
		if (selected.length === 0) {
			return;
		}
		try {
			const action = await dispatch(removeThirdsBulk(selected));
			if (removeThirdsBulk.rejected.match(action)) {
				throw new Error('No se pudo eliminar la selección');
			}

			if (removeThirdsBulk.fulfilled.match(action)) {
				const { failed, deleted } = action.payload;
				if (failed.length > 0) {
					dispatch(
						showMessage({
							message: `${failed.length} terceros no pudieron eliminarse (tienen relaciones).`,
							variant: 'warning'
						})
					);
				}
				if (deleted.length > 0) {
					dispatch(
						showMessage({
							message: `${deleted.length} terceros eliminados correctamente`,
							variant: 'success'
						})
					);
				}
			}
			setSelected([]);
		} catch (error) {
			dispatch(
				showMessage({
					message: 'No se pudo eliminar la selección',
					variant: 'error'
				})
			);
		}
	};

	const handleBulkAssign = async () => {
		if (selected.length === 0 || !selectedAssignUser) return;
		setAssigning(true);
		try {
			let assignedCount = 0;
			for (const thirdIdStr of selected) {
				const action = await dispatch(assignThirdByAdmin({ thirdId: Number(thirdIdStr), userId: selectedAssignUser.id }));
				if (assignThirdByAdmin.fulfilled.match(action)) {
					assignedCount++;
				}
			}
			dispatch(
				showMessage({
					message: `${assignedCount} paneles asignados a ${selectedAssignUser.firstName} ${selectedAssignUser.lastName}`,
					variant: 'success'
				})
			);
			setSelected([]);
			setAssignDialogOpen(false);
			dispatch(getThirds());
		} catch (error) {
			dispatch(
				showMessage({
					message: 'Error al asignar paneles',
					variant: 'error'
				})
			);
		} finally {
			setAssigning(false);
		}
	};

	const openAssignDialog = async () => {
		if (selected.length === 0) return;
		setAssignDialogOpen(true);
		setSelectedAssignUser(null);
		if (usersList.length === 0) {
			try {
				const res = await axios.get('/api/users');
				setUsersList(res.data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	function handleClick(item: ThirdType) {
		navigate(`/records/thirds/${item.id}`);
	}

	function handleCheck(event: ChangeEvent<HTMLInputElement>, id: string) {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
		setPage(+page);
	}

	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
		setRowsPerPage(+event.target.value);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					¡No hay paneles!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<ThirdsPartieTableHead
						selectedThirdIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleBulkDelete}
						onAssignMenuItemClick={openAssignDialog}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								(o) => {
									switch (o.id) {
										// case 'categories': {
										// 	return o.categories[0];
										// }
										default: {
											return o.id;
										}
									}
								}
							],
							[tableOrder.direction] as Many<boolean | 'asc' | 'desc'>
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n, index) => {
								const isSelected = n.id ? selected.indexOf(n.id.toString()) !== -1 : false;
								const labelId = `enhanced-table-checkbox-${index}`;
								const userPortfolio = n.thirds_portfolios?.find(
									(item) => item.portfolio && item.portfolio.userId === userId
								);
								let portfolioStatus = 'Sin asignar';
								if (userPortfolio) {
									portfolioStatus = userPortfolio.approved ? 'Aprobado' : 'Pendiente';
								}
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id || index}
										selected={isSelected}
										onClick={() => handleClick(n)}
									>
										<TableCell
											className="w-40 md:w-64 text-center"
											padding="none"
										>
											<Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.id ? n.id.toString() : '')}
												inputProps={{
													'aria-labelledby': labelId
												}}
											/>
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
										>
											{n.third_type?.name || 'Sin tipo'}
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
										>
											{n.typeIdentification}
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="normal"
										>
											{n.identification}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.name} {n.additionalName || ''}
										</TableCell>
										{role.includes('Representante') && (
											<TableCell align="left">{portfolioStatus}</TableCell>
										)}
										<TableCell align="left">{n.city || '-'}</TableCell>
										<TableCell align="left">{n.address || '-'}</TableCell>
										<TableCell align="left">{n.phone || '-'}</TableCell>
										<TableCell align="left">{n.impact || '-'}</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Asignar a Representante</DialogTitle>
				<DialogContent>
					<Typography variant="body2" color="text.secondary" className="mb-16">
						Seleccione el representante al que desea asignar {selected.length} panel(es).
					</Typography>
					<Autocomplete
						options={usersList}
						getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.email})`}
						value={selectedAssignUser}
						onChange={(_, newValue) => setSelectedAssignUser(newValue)}
						renderInput={(params) => <TextField {...params} label="Representante" variant="outlined" />}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setAssignDialogOpen(false)} disabled={assigning}>
						Cancelar
					</Button>
					<Button onClick={handleBulkAssign} color="primary" variant="contained" disabled={assigning || !selectedAssignUser}>
						{assigning ? 'Asignando...' : 'Asignar'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withRouter(ProductsTable);
