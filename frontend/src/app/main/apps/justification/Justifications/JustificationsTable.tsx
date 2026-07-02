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
import format from 'date-fns/format';
import { getJustifications, selectJustifications, selectSearchText } from '../store/justificationsSlice';
import JustificationsPartieTableHead from './JustificationsTableHead';
import { JustificationType } from '../types/JustificationType';
import { getThirdRegions, selectThirdRegions } from '../../../records/third/store/thirdRegionsSlice';
import { getUsers, selectUsers } from '../../../records/user/store/usersSlice';
import { selectUser } from 'app/store/user/userSlice';
import * as XLSX from 'xlsx';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type ProductsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The justifications table.
 */
function ProductsTable(props: ProductsTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const justifications = useAppSelector(selectJustifications);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const searchText = useAppSelector(selectSearchText);

	const user = useAppSelector(selectUser);
	const thirdRegions = useAppSelector(selectThirdRegions);
	const users = useAppSelector(selectUsers);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState(justifications);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [tableOrder, setTableOrder] = useState<{
		direction: 'asc' | 'desc';
		id: string;
	}>({
		direction: 'desc',
		id: ''
	});
	const [selectedRegion, setSelectedRegion] = useState<string>('0');
	const [selectedUser, setSelectedUser] = useState<string>('0');

	useEffect(() => {
		if (user.role.includes('Administrador')) {
			dispatch(getThirdRegions());
			dispatch(getUsers());
		}
		dispatch(getJustifications({ regionId: parseInt(selectedRegion), userId: parseInt(selectedUser) })).then(() => setLoading(false));
	}, [dispatch, user.role, selectedRegion, selectedUser]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(
				_.filter(justifications, (item) => item.description.toLowerCase().includes(searchText.toLowerCase()))
			);
			setPage(0);
		} else {
			setData(justifications);
		}
	}, [justifications, searchText]);

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

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item: JustificationType) {
		navigate(`/apps/justifications/${item.id}`);
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
					¡No hay justificaciones!
				</Typography>
			</motion.div>
		);
	}

	const isAdmin = () => {
		if (user.role.includes('Administrador')) {
			return true;
		}
		return false;
	};

	const handleRegionChange = (event: SelectChangeEvent<string>) => {
		setSelectedRegion(event.target.value);
	};

	const handleUserChange = (event: SelectChangeEvent<string>) => {
		setSelectedUser(event.target.value);
	};

	const handleExport = () => {
		const dataToExport = data.map(row => ({
			"ID": row.id,
			"Tercero": row.third.name,
			"Fecha": format(new Date(row.date), 'dd/MM/yyyy hh:mm a'),
			"Justificación": row.description
		}));
		const worksheet = XLSX.utils.json_to_sheet(dataToExport);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Justificaciones");
		XLSX.writeFile(workbook, "Justificaciones.xlsx");
	};

	return (
		<div className="w-full flex flex-col min-h-full">
			<div className="p-10 m-5 flex items-center justify-between flex-wrap gap-16">
				<div className="flex gap-16 flex-wrap">
					{isAdmin() && (
						<>
							<FormControl size="small" style={{ minWidth: 200 }}>
								<InputLabel>Regional</InputLabel>
								<Select
									value={selectedRegion}
									label="Regional"
									onChange={handleRegionChange}
								>
									<MenuItem value="0">Todas las regionales</MenuItem>
									{thirdRegions?.map((r) => (
										<MenuItem key={r.id} value={r.id.toString()}>
											{r.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl size="small" style={{ minWidth: 200 }}>
								<InputLabel>Asesor / Representante</InputLabel>
								<Select
									value={selectedUser}
									label="Asesor / Representante"
									onChange={handleUserChange}
								>
									<MenuItem value="0">Todos los asesores</MenuItem>
									{users?.map((u) => (
										<MenuItem key={u.id} value={u.id.toString()}>
											{u.firstName} {u.lastName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</>
					)}
				</div>
				<Button
					variant="contained"
					color="primary"
					onClick={handleExport}
					startIcon={<FuseSvgIcon>heroicons-outline:download</FuseSvgIcon>}
				>
					Exportar a Excel
				</Button>
			</div>
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<JustificationsPartieTableHead
						selectedJustificationIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
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
								const isSelected = selected.indexOf(n.id.toString()) !== -1;
								const labelId = `enhanced-table-checkbox-${index}`;
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
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
												onChange={(event) => handleCheck(event, n.id.toString())}
												inputProps={{
													'aria-labelledby': labelId
												}}
											/>
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{n.third.name}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{format(new Date(n.date), 'dd/MM/yyyy hh:mm a')}
										</TableCell>
										<TableCell align="left">{n.description}</TableCell>
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
		</div>
	);
}

export default withRouter(ProductsTable);
