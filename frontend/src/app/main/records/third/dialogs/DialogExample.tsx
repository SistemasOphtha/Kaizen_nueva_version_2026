import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormDialogProps {
	open: boolean;
	handleClose: () => void;
}

export default function EditFormDialog({ open, handleClose }: FormDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: 'form',
				onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					// const formJson = Object.fromEntries((formData as any).entries());
					// const { email } = formJson;
          const email = formData.get('email');
          console.log(email);
					handleClose();
				}
			}}
		>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email address here. We will send updates
					occasionally.
				</DialogContentText>
				<TextField
					autoFocus
					required
					margin="dense"
					id="name"
					name="email"
					label="Email Address"
					type="email"
					fullWidth
					variant="standard"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit">Subscribe</Button>
			</DialogActions>
		</Dialog>
	);
}
