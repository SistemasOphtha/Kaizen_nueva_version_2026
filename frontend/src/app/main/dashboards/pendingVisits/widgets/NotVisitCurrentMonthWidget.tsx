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
import { memo, useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'app/store';
import { selectUser } from 'app/store/user/userSlice';
import { selectWidgets } from '../store/widgetsSlice';
import ThirdNotVisitCurrentMonthWidgetType from '../types/ThirdNotVisitCurrentMonthWidgetType';

/**
 * The NotVisitLastMonthWidget widget.
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

function NotVisitLastMonthWidget() {
	const widgets = useAppSelector(selectWidgets);
	const user = useAppSelector(selectUser);
	const { columns, rows } = widgets.thirdNotVisitCurrentMonth as ThirdNotVisitCurrentMonthWidgetType;

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

	const isAdmin = () => {
		if (user.role.includes('Administrador')) {
			return true;
		}
		return false;
	};

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<div>
				<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">Visita</Typography>
				<Typography
					className="font-medium"
					color="text.secondary"
				>
					Lista de terceros que faltan por visitar en el mes actual.
				</Typography>
			</div>
			<TableContainer component={Paper}>
				<div className="table-responsive mt-24">
					<div className="p-10 m-5">
						<TextField
							label="Filtrar"
							variant="outlined"
							value={filterData}
							onChange={(e) => setFilterData(e.target.value)}
						/>
					</div>
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
											case 'id': {
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
											case 'count': {
												return (
													<TableCell
														key={key}
														component="th"
														scope="row"
													>
														<Typography
															className={clsx(
																'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
																value === 0 &&
																	'text-red-100 bg-red-800 dark:bg-red-600 dark:text-red-50',
																Number(value) > 0 &&
																	Number(value) < row.impact &&
																	'text-green-50 bg-orange-800 dark:bg-orange-600 dark:text-green-50',
																Number(value) >= row.impact &&
																	'text-green-100 bg-green-800 dark:bg-green-600 dark:text-green-50'
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
										<Button
											component={Link}
											to={`/apps/visits/new/${row.id}`}
											variant="contained"
											color="success"
											startIcon={<FuseSvgIcon>heroicons-outline:link</FuseSvgIcon>}
										>
											Ir a visita
										</Button>
									</TableCell>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={6}
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
				</div>
			</TableContainer>
		</Paper>
	);
}

export default memo(NotVisitLastMonthWidget);
