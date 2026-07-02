import { useSelector } from 'react-redux';
import { selectUserCategories } from './store/userCategoriesSlice';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch } from 'app/store';
import { deleteUserCategory, getUserCategory } from './store/userCategorySlice';
import { getUserCategories } from './store/userCategoriesSlice';
import UserCategoryDialog from './UserCategoryDialog';
import { useState } from 'react';

function UserCategoriesTable() {
	const dispatch = useAppDispatch();
	const categories = useSelector(selectUserCategories);
	const [openDialog, setOpenDialog] = useState(false);

	const handleEdit = (id: string) => {
		dispatch(getUserCategory(id)).then(() => {
			setOpenDialog(true);
		});
	};

	const handleDelete = (id: string) => {
		if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
			dispatch(deleteUserCategory(id)).then(() => {
				dispatch(getUserCategories() as any);
			});
		}
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table aria-label="user categories table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell align="center">Crear</TableCell>
							<TableCell align="center">Leer</TableCell>
							<TableCell align="center">Actualizar</TableCell>
							<TableCell align="center">Eliminar</TableCell>
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories.map((category) => (
							<TableRow key={category.id}>
								<TableCell>{category.id}</TableCell>
								<TableCell>{category.name}</TableCell>
								<TableCell align="center">
									<FuseSvgIcon size={20} color={category.canCreate ? 'success' : 'disabled'}>
										{category.canCreate ? 'heroicons-outline:check-circle' : 'heroicons-outline:x-circle'}
									</FuseSvgIcon>
								</TableCell>
								<TableCell align="center">
									<FuseSvgIcon size={20} color={category.canRead ? 'success' : 'disabled'}>
										{category.canRead ? 'heroicons-outline:check-circle' : 'heroicons-outline:x-circle'}
									</FuseSvgIcon>
								</TableCell>
								<TableCell align="center">
									<FuseSvgIcon size={20} color={category.canUpdate ? 'success' : 'disabled'}>
										{category.canUpdate ? 'heroicons-outline:check-circle' : 'heroicons-outline:x-circle'}
									</FuseSvgIcon>
								</TableCell>
								<TableCell align="center">
									<FuseSvgIcon size={20} color={category.canDelete ? 'success' : 'disabled'}>
										{category.canDelete ? 'heroicons-outline:check-circle' : 'heroicons-outline:x-circle'}
									</FuseSvgIcon>
								</TableCell>
								<TableCell align="right">
									<IconButton
										color="primary"
										onClick={() => handleEdit(category.id.toString())}
									>
										<FuseSvgIcon>heroicons-outline:pencil-alt</FuseSvgIcon>
									</IconButton>
									<IconButton
										color="error"
										onClick={() => handleDelete(category.id.toString())}
									>
										<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<UserCategoryDialog open={openDialog} onClose={() => setOpenDialog(false)} />
		</>
	);
}

export default UserCategoriesTable;
