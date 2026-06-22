import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
// import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import { motion } from 'framer-motion';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { Many } from 'lodash';
import { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import * as React from 'react';
import format from 'date-fns/format';
import ExcelJS from 'exceljs';
import { Buffer } from 'buffer';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUserRegions } from '../../../records/user/store/userRegionsSlice';
import { selectUsers } from '../../../records/user/store/usersSlice';
import { getWorkplansForRangeDate, selectWorkplans, selectSearchText } from '../store/workplansSlice';
import WorkplansPartieTableHead from './WorkplansTableHead';
import { WorkplanType } from '../types/WorkplanType';
// import { UserType } from '../../../records/user/types/UserType';

type ProductsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The workplans table.
 */
function ProductsTable(props: ProductsTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const workplans = useAppSelector(selectWorkplans);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const searchText = useAppSelector(selectSearchText);
	const userRegions = useAppSelector(selectUserRegions);
	const users = useAppSelector(selectUsers);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState(workplans);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [region, setRegion] = React.useState<number>(0);
	const [user, setUser] = React.useState<number>(0);
	const [tableOrder, setTableOrder] = useState<{
		direction: 'asc' | 'desc';
		id: string;
	}>({
		direction: 'desc',
		id: ''
	});

	const dateCurrentDay = new Date();
	const dateFirstDay = new Date(dateCurrentDay.getFullYear(), dateCurrentDay.getMonth(), 1);

	const [startDateForm, setStartDateForm] = useState<Date>(dateFirstDay);
	const [endDateForm, setEndDateForm] = useState<Date>(dateCurrentDay);

	useEffect(() => {
		dispatch(
			getWorkplansForRangeDate({
				startDate: startDateForm.toISOString(),
				endDate: endDateForm.toISOString(),
				filter: ''
			})
		).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(workplans, (item) => item.description.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(workplans);
		}
	}, [workplans, searchText]);

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

	function handleClick(item: WorkplanType) {
		navigate(`/dashboards/workplans/${item.id}`);
	}

	// function handleCheck(event: ChangeEvent<HTMLInputElement>, id: string) {
	// 	const selectedIndex = selected.indexOf(id);
	// 	let newSelected: string[] = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, id);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
	// 	}

	// 	setSelected(newSelected);
	// }

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

	// if (data.length === 0) {
	// 	return (
	// 		<motion.div
	// 			initial={{ opacity: 0 }}
	// 			animate={{ opacity: 1, transition: { delay: 0.1 } }}
	// 			className="flex flex-1 items-center justify-center h-full"
	// 		>
	// 			<Typography
	// 				color="text.secondary"
	// 				variant="h5"
	// 			>
	// 				¡No hay planes de trabajo!
	// 			</Typography>
	// 		</motion.div>
	// 	);
	// }

	const handleFilter = () => {
		if (startDateForm === null || endDateForm === null) {
			return;
		}

		const filterBase64 = Buffer.from(
			JSON.stringify({
				region,
				user,
				startDate: startDateForm.toISOString(),
				endDate: endDateForm.toISOString()
			})
		).toString('base64');

		dispatch(
			getWorkplansForRangeDate({
				startDate: startDateForm.toISOString(),
				endDate: endDateForm.toISOString(),
				filter: filterBase64
			})
		).then(() => setLoading(false));
	};

	const exportToExcel = async (fileName: string, dataWorkplans: WorkplanType[]) => {
		const workbook = new ExcelJS.Workbook();

		// Agrupar los datos por región
		const workplansByRegion = dataWorkplans.reduce(
			(acc, workplan: WorkplanType) => {
				const region = workplan.user?.region;
				if (workplan.user && region) {
					const regionName = region.name;
					if (!acc[regionName]) {
						acc[regionName] = [];
					}
					acc[regionName].push(workplan);
				} else {
					// Para workplans sin región, los agrupamos en "Sin Región"
					if (!acc['Sin Región']) {
						acc['Sin Región'] = [];
					}
					acc['Sin Región'].push(workplan);
				}
				return acc;
			},
			{} as Record<string, WorkplanType[]>
		);

		// Crear una hoja para cada región
		Object.entries(workplansByRegion).forEach(([regionName, regionWorkplans]) => {
			// Crear una hoja con el nombre de la región
			const worksheet = workbook.addWorksheet(regionName);

			// Configurar las columnas
			worksheet.columns = [
				{ header: 'USUARIO', key: 'userfull', width: 20 },
				{ header: 'FECHA INICIO', key: 'startDate', width: 20 },
				{ header: 'FECHA FIN', key: 'endDate', width: 20 },
				{ header: 'TIPO DE EVENTO', key: 'eventType', width: 20 },
				{ header: 'DESCRIPCIÓN', key: 'description', width: 50 }
			];

			// Dar formato al encabezado
			worksheet.getRow(1).eachCell((cell) => {
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'FFFFFF00' } // Color amarillo
				};
				cell.font = { bold: true };
				cell.alignment = { vertical: 'middle', horizontal: 'center' };
			});

			// Agrupar los workplans por usuario y ordenarlos por fecha
			const workplansByUser = regionWorkplans.reduce(
				(acc, workplan: WorkplanType) => {
					if (workplan.user) {
						const userName = `${workplan.user.firstName} ${workplan.user.lastName}`;
						if (!acc[userName]) {
							acc[userName] = [];
						}
						acc[userName].push(workplan);
					} else {
						const noUserKey = 'Usuario no especificado';
						if (!acc[noUserKey]) {
							acc[noUserKey] = [];
						}
						acc[noUserKey].push(workplan);
					}
					return acc;
				},
				{} as Record<string, WorkplanType[]>
			);

			// Ordenar cada grupo de usuario por fecha de inicio
			Object.entries(workplansByUser).forEach(([userName, userWorkplans]) => {
				// Ordenar los workplans del usuario por fecha de inicio
				userWorkplans.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

				// Agregar un separador con el nombre del usuario
				const userRow = worksheet.addRow([userName]);
				userRow.font = { bold: true };
				userRow.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'E6E6E6' } // Color gris claro
				};

				// Agregar los datos del usuario
				userWorkplans.forEach((row: WorkplanType) => {
					if (row.user) {
						worksheet.addRow({
							userfull: `${row.user.firstName} ${row.user.lastName}`,
							startDate: format(new Date(row.startDate), 'dd/MM/yyyy hh:mm a'),
							endDate: format(new Date(row.endDate), 'dd/MM/yyyy hh:mm a'),
							eventType: row.typeEvent ? row.typeEvent.name : '',
							description: row.description
						});
					} else {
						worksheet.addRow(row);
					}
				});

				// Agregar una fila en blanco después de cada usuario
				worksheet.addRow([]);
			});

			// Ajustar el ancho de las columnas automáticamente
			worksheet.columns.forEach((column) => {
				column.width = Math.max(column.width || 10, 12);
			});
		});

		// Generar el archivo Excel
		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${fileName}.xlsx`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<div className="flex flex-row flex-wrap gap-8 items-center p-5">
					<DatePicker
						label="Fecha de inicio"
						format="dd/MM/yyyy"
						value={startDateForm}
						maxDate={endDateForm}
						onChange={(newValue) => {
							setStartDateForm(newValue);
						}}
					/>{' '}
					-{' '}
					<DatePicker
						label="Fecha de fin"
						format="dd/MM/yyyy"
						value={endDateForm}
						minDate={startDateForm}
						onChange={(newValue) => {
							setEndDateForm(newValue);
						}}
					/>
					<FormControl sx={{ minWidth: 180 }}>
						<InputLabel id="demo-select-small-label">Región</InputLabel>
						<Select
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={region}
							label="Región"
							onChange={(e) => setRegion(Number(e.target.value))}
						>
							<MenuItem value="0">
								<em>Todos</em>
							</MenuItem>
							{userRegions.map((region) => (
								<MenuItem
									key={region.id}
									value={region.id}
								>
									{region.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* <FormControl sx={{ minWidth: 180 }}>
						<InputLabel id="demo-select-small-label">Usuario</InputLabel>
						<Select
							labelId="demo-select-small-label"
							id="demo-select-small"
							value={user}
							label="Usuario"
							onChange={(e) => setUser(Number(e.target.value))}
						>
							<MenuItem value="0">
								<em>Todos</em>
							</MenuItem>
							{users.map((user) => (
								<MenuItem
									key={user.id}
									value={user.id}
								>
									{user.firstName} {user.lastName} - {user.region?.name}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}
					<FormControl sx={{ minWidth: 180 }}>
						<Autocomplete
							disablePortal
							options={users}
							sx={{ width: 300 }}
							onChange={(e, value) => setUser(value?.id || 0)}
							getOptionLabel={(option) =>
								`${option.firstName} ${option.lastName} - ${option.region?.name}`
							}
							renderOption={(props, option) => {
								const { ...optionProps } = props;
								return (
									<Box
										key={option.id}
										component="li"
										{...optionProps}
									>
										{option.firstName} {option.lastName} - {option.region?.name}
									</Box>
								);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Usuario"
								/>
							)}
						/>
					</FormControl>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleFilter}
					>
						Filtrar
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => exportToExcel(`workplans_${new Date().getTime()}`, data)}
						endIcon={
							<FuseSvgIcon
								className="text-7xl text-white"
								size={18}
								color="action"
							>
								heroicons-outline:download
							</FuseSvgIcon>
						}
					>
						Exportar
					</Button>
				</div>
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<WorkplansPartieTableHead
						selectedWorkplanIds={selected}
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
											{/* <Checkbox
												checked={isSelected}
												onClick={(event) => event.stopPropagation()}
												onChange={(event) => handleCheck(event, n.id.toString())}
												inputProps={{
													'aria-labelledby': labelId
												}}
											/> */}
										</TableCell>

										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{n.user.firstName} {n.user.lastName}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{format(new Date(n.startDate), 'dd/MM/yyyy hh:mm a')}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{format(new Date(n.endDate), 'dd/MM/yyyy hh:mm a')}
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
