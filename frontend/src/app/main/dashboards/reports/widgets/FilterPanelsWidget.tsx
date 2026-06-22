import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import ExcelJS from 'exceljs';
import { memo, useState } from 'react';
import clsx from 'clsx';
// import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { selectUser } from 'app/store/user/userSlice';
import { selectWidgets, getWidgets } from '../store/widgetsSlice';
import FilterPanelsWidgetType, { ThirdType } from '../types/FilterPanelsWidgetType';
import FilterThirdForm from '../components/FilterThirdForm';
import PanelDetailsDialog from '../dialogs/PanelDetailsDialog';

/**
 * The FilterPanelsWidget widget.
 */

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-double-right
					</FuseSvgIcon>
				) : (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-double-left
					</FuseSvgIcon>
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-right
					</FuseSvgIcon>
				) : (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-left
					</FuseSvgIcon>
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-left
					</FuseSvgIcon>
				) : (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-right
					</FuseSvgIcon>
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-double-left
					</FuseSvgIcon>
				) : (
					<FuseSvgIcon
						className="text-48"
						size={24}
						color="action"
					>
						heroicons-outline:chevron-double-right
					</FuseSvgIcon>
				)}
			</IconButton>
		</Box>
	);
}

function FilterPanelsWidget() {
	const widgets = useAppSelector(selectWidgets);
	// const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const thirdsReport = widgets?.thirdsReport as FilterPanelsWidgetType | undefined;
	const columns = thirdsReport?.columns || [];
	const rows = thirdsReport?.rows || [];
	const data = thirdsReport?.data || [];
	const [loading, setLoading] = useState(false);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterData, setFilterData] = useState<string>('');

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	// Filtra las filas basadas en el filtro antes de aplicar la paginación
	const filteredRows = rows.filter((row) => {
		return (
			row.name.toLowerCase().includes(filterData.toLowerCase()) ||
			row.identification.toLowerCase().includes(filterData.toLowerCase())
		);
	});
	const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const isAdmin = () => {
	// 	if (user.role.includes('Administrador')) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	const handleFilter = (
		type: number,
		identification: string,
		name: string,
		region: number,
		status: string,
		userId: number
	) => {
		dispatch(
			getWidgets({
				type,
				identification,
				name,
				region,
				status,
				userId
			})
		).then(() => setLoading(false));
	};

	const exportToExcel = async (fileName: string, data: ThirdType[]) => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Paneles');

		worksheet.columns = [
			{ header: 'TIPO PANEL', key: 'type', width: 10 },
			{ header: 'IDENTIFICACIÓN', key: 'identification', width: 10 },
			{ header: 'NOMBRE Y APELLIDO', key: 'name', width: 10 },
			{ header: 'REGION', key: 'region', width: 10 },
			{ header: 'IMPACTOS', key: 'impact', width: 10 },
			{ header: 'ESTADO', key: 'status', width: 10 }
		];

		worksheet.getRow(1).eachCell((cell) => {
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFFFFF00' } // Color amarillo
			};
		});

		data.forEach((row) => {
			worksheet.addRow(row);
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

	// if (loading) {
	// 	return (
	// 		<div className="flex items-center justify-center h-full">
	// 			{/* <FuseLoading  /> */}
	// 			cargando...
	// 		</div>
	// 	);
	// }

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<TableContainer component={Paper}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
						justifyContent: 'start',
						mt: 2,
						ml: 2
					}}
				>
					<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
						Paneles
					</Typography>
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						Lista de paneles
					</Typography>
				</Box>

				<div className="table-responsive mt-24">
					<div className="flex p-10 m-5 gap-8">
						<TextField
							label="Filtrar"
							variant="outlined"
							inputMode="search"
							size="small"
							value={filterData}
							onChange={(e) => setFilterData(e.target.value)}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => exportToExcel(`Panels_Report_${new Date().getTime()}`, paginatedRows)}
						>
							Exportar a Excel
						</Button>
					</div>
					<FilterThirdForm
						onFilter={handleFilter}
						setLoading={setLoading}
					/>
					{loading ? (
						<div className="flex items-center justify-center h-full">
							<FuseLoading />
						</div>
					) : (
						<Table className="simple w-full min-w-full">
							<TableHead>
								<TableRow>
									{columns.map((column, index) => (
										<TableCell key={index}>
											<Typography
												color="text.secondary"
												className="font-semibold text-12 whitespace-nowrap"
											>
												{column}
											</Typography>
										</TableCell>
									))}
									<TableCell>
										<Typography
											color="text.secondary"
											className="font-semibold text-12 whitespace-nowrap"
										>
											Acciones
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{paginatedRows.map((row, index) => (
									<TableRow key={index}>
										{Object.entries(row).map(([key, value]) => {
											switch (key) {
												case 'type': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography color="text.secondary">{value}</Typography>
														</TableCell>
													);
												}
												case 'identification': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography>{value}</Typography>
														</TableCell>
													);
												}
												case 'name': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography>{value}</Typography>
														</TableCell>
													);
												}
												case 'region': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography>{value}</Typography>
														</TableCell>
													);
												}
												case 'impact': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography>{value}</Typography>
														</TableCell>
													);
												}
												case 'status': {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography
																className={clsx(
																	'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
																	value !== 'active' &&
																		'text-red-100 bg-red-800 dark:bg-red-600 dark:text-red-50',
																	value === 'active' &&
																		'text-green-50 bg-green-800 dark:bg-green-600 dark:text-green-50'
																)}
															>
																{value}
															</Typography>
														</TableCell>
													);
												}
												default: {
													return (
														<TableCell
															key={key}
															component="th"
															scope="row"
														>
															<Typography>{value}</Typography>
														</TableCell>
													);
												}
											}
										})}
										<TableCell
											component="th"
											scope="row"
										>
											{/* <Button
												component={Link}
												to={`/apps/justifications/new/${row.identification}`}
												variant="contained"
												color="secondary"
												startIcon={<FuseSvgIcon>heroicons-outline:link</FuseSvgIcon>}
												disabled
											>
												Ver detalles
											</Button> */}
											<PanelDetailsDialog third={data[index]} />
										</TableCell>
									</TableRow>
								))}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={7} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
										colSpan={7}
										count={filteredRows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
										SelectProps={{
											inputProps: {
												'aria-label': 'rows per page'
											},
											native: true
										}}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					)}
				</div>
			</TableContainer>
		</Paper>
	);
}

export default memo(FilterPanelsWidget);
