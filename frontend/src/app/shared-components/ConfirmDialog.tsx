import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
	open: boolean;
	handleConfirm: () => void;
	handleClose: () => void;
}

export default function ConfirmDialog({ open, handleConfirm, handleClose }: ConfirmDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>Confirmación</DialogTitle>
			<DialogContent>
				<DialogContentText>¿Está seguro que desea realizar esta acción?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button onClick={handleConfirm}>Aceptar</Button>
			</DialogActions>
		</Dialog>
	);
}
