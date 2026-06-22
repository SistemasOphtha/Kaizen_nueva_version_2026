import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
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
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { getWorkplansForRangeDate, selectWorkplans, selectSearchText } from '../store/workplansSlice';
import WorkplansPartieTableHead from './WorkplansTableHead';
import { WorkplanType } from '../types/WorkplanType';

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

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState(workplans);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
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
				endDate: endDateForm.toISOString()
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
		navigate(`/apps/workplans/${item.id}`);
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
		dispatch(
			getWorkplansForRangeDate({
				startDate: startDateForm.toISOString(),
				endDate: endDateForm.toISOString()
			})
		).then(() => setLoading(false));
	};

	const exportToExcel = async (fileName: string, dataWorkplans: WorkplanType[]) => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Impactos');

		worksheet.columns = [
			{ header: 'USUARIO', key: 'userfull', width: 10 },
			{ header: 'FECHA INICIO', key: 'startDate', width: 10 },
			{ header: 'FECHA FIN', key: 'endDate', width: 10 },
			{ header: 'DESCRIPCIÓN', key: 'description', width: 10 }
		];

		worksheet.getRow(1).eachCell((cell) => {
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFFFFF00' } // Color amarillo
			};
		});

		dataWorkplans.forEach((row) => {
			if (row.user) {
				worksheet.addRow({
					userfull: `${row.user.firstName} ${row.user.lastName}`,
					startDate: format(new Date(row.startDate), 'dd/MM/yyyy hh:mm a'),
					endDate: format(new Date(row.endDate), 'dd/MM/yyyy hh:mm a'),
					description: row.description
				});
			} else {
				worksheet.addRow(row);
			}
		});

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
				<div className="flex flex-row gap-8 items-center p-5">
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
					>
						Exportar a Excel
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
