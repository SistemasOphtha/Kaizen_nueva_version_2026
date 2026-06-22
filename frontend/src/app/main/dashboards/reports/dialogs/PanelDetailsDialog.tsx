import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { ThirdType } from '../../../records/third/types/ThirdType';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactNode;
	},
	ref: React.Ref<unknown>
) {
	return (
		<Slide
			direction="up"
			ref={ref}
			in={props.in}
			timeout={props.timeout}
			mountOnEnter={props.mountOnEnter}
			unmountOnExit={props.unmountOnExit}
		>
			{props.children as React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>}
		</Slide>
	);
});

interface PanelDetailsDialogProps {
	third: ThirdType;
}

export default function PanelDetailsDialog({ third }: PanelDetailsDialogProps) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
			>
				Detalles
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>Detalles</DialogTitle>
				<DialogContent sx={{ width: '600px' }}>
					<DialogContentText id="alert-dialog-slide-description">
						<Card sx={{ width: '100%' }}>
							<CardContent>
								<Typography
									variant="h5"
									component="div"
								>
									{third.name} {third.additionalName}
								</Typography>
								<Typography
									sx={{ mb: 1.5 }}
									color="text.secondary"
								>
									{third.third_type.name}
								</Typography>
								<Typography variant="body2">
									{third.address}
									<br />
									{third.email}
									<br />
									{third.phone}
								</Typography>
							</CardContent>
							{/* <CardActions>
								<Button size="small">Learn More</Button>
							</CardActions> */}
						</Card>
						<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							{/* <nav aria-label="main mailbox folders">
								<List>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText primary="Inbox" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<DraftsIcon />
											</ListItemIcon>
											<ListItemText primary="Drafts" />
										</ListItemButton>
									</ListItem>
								</List>
							</nav>
							<Divider /> */}
							{/* <nav aria-label="secondary mailbox folders">
								<List>
									<ListItem disablePadding>
										<ListItemButton
											component="a"
											href={`/records/thirds/${third.id}`}
										>
											<ListItemText primary={third.id} />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText primary={`${third.name} ${third.additionalName}`} />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText primary={`${third.address}`} />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText primary={`${third.phone}`} />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemText primary={`${third.email}`} />
										</ListItemButton>
									</ListItem>
								</List>
							</nav> */}
						</Box>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Ok</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
