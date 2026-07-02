import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch } from 'app/store';
import { newUserCategory } from './store/userCategorySlice';
import UserCategoryDialog from './UserCategoryDialog';
import { useState } from 'react';

function UserCategoriesHeader() {
	const dispatch = useAppDispatch();
	const [openDialog, setOpenDialog] = useState(false);

	const handleAddClick = () => {
		dispatch(newUserCategory());
		setOpenDialog(true);
	};

	return (
		<div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
			<Typography
				component={undefined}
				className="text-3xl font-extrabold tracking-tight"
			>
				Categorías de Usuarios
			</Typography>

			<div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
				<Button
					className="max-w-md w-full"
					variant="contained"
					color="secondary"
					onClick={handleAddClick}
					startIcon={<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>}
				>
					Nueva Categoría
				</Button>
			</div>

			<UserCategoryDialog open={openDialog} onClose={() => setOpenDialog(false)} />
		</div>
	);
}

export default UserCategoriesHeader;
