import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from 'app/store';
import { selectUserCategory, addUserCategory, updateUserCategory, resetUserCategory } from './store/userCategorySlice';
import { getUserCategories } from './store/userCategoriesSlice';
import { UserCategoryType } from './types/UserCategoryType';

type Props = {
	open: boolean;
	onClose: () => void;
};

const defaultValues = {
	name: '',
	canCreate: false,
	canRead: true,
	canUpdate: false,
	canDelete: false
};

function UserCategoryDialog({ open, onClose }: Props) {
	const dispatch = useAppDispatch();
	const userCategory = useSelector(selectUserCategory);

	const { control, handleSubmit, reset, formState: { isValid, dirtyFields } } = useForm({
		mode: 'onChange',
		defaultValues
	});

	useEffect(() => {
		if (open) {
			if (userCategory && userCategory.id !== 0) {
				reset(userCategory);
			} else {
				reset(defaultValues);
			}
		}
	}, [open, userCategory, reset]);

	const onSubmit = (data: Partial<UserCategoryType>) => {
		if (userCategory && userCategory.id !== 0) {
			dispatch(updateUserCategory({ ...data, id: userCategory.id } as UserCategoryType)).then(() => {
				dispatch(getUserCategories() as any);
				handleClose();
			});
		} else {
			dispatch(addUserCategory(data)).then(() => {
				dispatch(getUserCategories() as any);
				handleClose();
			});
		}
	};

	const handleClose = () => {
		dispatch(resetUserCategory());
		onClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<DialogTitle>
				{userCategory && userCategory.id !== 0 ? 'Editar Categoría' : 'Nueva Categoría'}
			</DialogTitle>
			<DialogContent className="pt-24 pb-32">
				<form id="category-form" className="flex flex-col space-y-24" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						rules={{ required: 'El nombre es requerido' }}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								label="Nombre de Categoría"
								variant="outlined"
								fullWidth
								error={!!error}
								helperText={error?.message}
								autoFocus
							/>
						)}
					/>

					<div className="flex flex-col space-y-12">
						<h3 className="font-semibold text-16">Matriz de Permisos</h3>
						<div className="grid grid-cols-2 gap-16">
							<Controller
								name="canCreate"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControlLabel
										control={<Checkbox checked={value} onChange={onChange} />}
										label="Crear (Agregar)"
									/>
								)}
							/>
							<Controller
								name="canRead"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControlLabel
										control={<Checkbox checked={value} onChange={onChange} />}
										label="Leer (Ver)"
									/>
								)}
							/>
							<Controller
								name="canUpdate"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControlLabel
										control={<Checkbox checked={value} onChange={onChange} />}
										label="Actualizar (Editar)"
									/>
								)}
							/>
							<Controller
								name="canDelete"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControlLabel
										control={<Checkbox checked={value} onChange={onChange} />}
										label="Eliminar"
									/>
								)}
							/>
						</div>
					</div>
				</form>
			</DialogContent>
			<DialogActions className="px-24 pb-24">
				<Button onClick={handleClose} color="inherit">
					Cancelar
				</Button>
				<Button
					type="submit"
					form="category-form"
					variant="contained"
					color="secondary"
					disabled={!isValid || (userCategory?.id !== 0 && Object.keys(dirtyFields).length === 0)}
				>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default UserCategoryDialog;
