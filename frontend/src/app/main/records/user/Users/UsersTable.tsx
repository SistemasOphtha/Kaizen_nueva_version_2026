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
import { showMessage } from 'app/store/fuse/messageSlice';
import { getUsers, removeUsersBulk, selectUsers, selectSearchText } from '../store/usersSlice';
import UsersTableHead from './UsersTableHead';
import { UserType } from '../types/UserType';

type UsersTableProps = WithRouterProps & {
	navigate: (path: string) => void;
};

/**
 * The users table.
 */
function UsersTable(props: UsersTableProps) {
	const { navigate } = props;
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsers);
	const searchText = useAppSelector(selectSearchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState<string[]>([]);
	const [data, setData] = useState(users);
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
		dispatch(getUsers()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(users, (item) => item.firstName.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(users);
		}
	}, [users, searchText]);

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
			const action = await dispatch(removeUsersBulk(selected));
			if (removeUsersBulk.rejected.match(action)) {
				throw new Error('No se pudo eliminar la selección');
			}

			if (removeUsersBulk.fulfilled.match(action)) {
				const { failed, deleted } = action.payload;
				if (failed.length > 0) {
					dispatch(
						showMessage({
							message: `${failed.length} usuarios no pudieron eliminarse (tienen relaciones).`,
							variant: 'warning'
						})
					);
				}
				if (deleted.length > 0) {
					dispatch(
						showMessage({
							message: `${deleted.length} usuarios eliminados correctamente`,
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

	// function handleDeselect() {
	// 	setSelected([]);
	// }

	function handleClick(item: UserType) {
		navigate(`/records/users/${item.id}`);
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
					No hay usuarios
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
					<UsersTableHead
						selectedUserIds={selected}
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
								const labelId = `users-table-checkbox-${index}`;
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
											{n.firstName} {n.lastName}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.email}
										</TableCell>
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
										>
											{n.user_classification?.name}
										</TableCell>
										<TableCell align="left">{n.status}</TableCell>
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

export default withRouter(UsersTable);
