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
import { selectUser } from 'app/store/user/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getThirds, removeThirdsBulk, selectThirds, selectSearchText } from '../store/thirdsSlice';
import ThirdsPartieTableHead from './ThirdsTableHead';
import { ThirdType } from '../types/ThirdType';

type ProductsTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The thirds table.
 */
function ProductsTable(props: ProductsTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const thirds = useAppSelector(selectThirds);
	const { role, id: userId } = useAppSelector(selectUser);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const searchText = useAppSelector(selectSearchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState<ThirdType[]>(thirds);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
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
		if (searchText.length !== 0) {
			const searchWords = searchText.toLowerCase().split(/\s+/).filter(Boolean);
			if (searchWords.length === 0) {
				setData(thirds);
			} else {
				setData(
					thirds.filter((third) => {
						const name = (third.name || '').toLowerCase();
						const additionalName = (third.additionalName || '').toLowerCase();
						const identification = (third.identification || '').toLowerCase();
						const email = (third.email || '').toLowerCase();
						const city = (third.city || '').toLowerCase();
						const specialty = (third.third_specialty?.name || '').toLowerCase();
						const classification = (third.third_classification?.name || '').toLowerCase();
						const type = (third.third_type?.name || '').toLowerCase();
						const region = (third.region?.name || '').toLowerCase();
						
						const fullText = `${name} ${additionalName} ${identification} ${email} ${city} ${specialty} ${classification} ${type} ${region}`;
						return searchWords.every((word) => fullText.includes(word));
					})
				);
			}
			setPage(0);
		} else {
			setData(thirds);
		}
	}, [thirds, searchText]);

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
		</div>
	);
}

export default withRouter(ProductsTable);
