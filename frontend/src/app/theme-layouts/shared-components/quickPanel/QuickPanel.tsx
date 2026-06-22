import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import withReducer from 'app/store/withReducer';
import reducer from './store';
// import { QuickModelType } from '../model/QuickModel';
import { selectQuicks, getQuicks } from './store/dataSlice';
import { selectUser } from 'app/store/user/userSlice';
import { selectQuickPanelState, toggleQuickPanel } from './store/stateSlice';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
	'& .MuiDrawer-paper': {
		width: 280
	}
}));

/**
 * The quick panel.
 */
function QuickPanel() {
	const dispatch = useAppDispatch();

	const data = useSelector(selectQuicks);
	const state = useSelector(selectQuickPanelState);
	const user = useSelector(selectUser);

	const [checked, setChecked] = useState<string[]>(() => {
		const saved = localStorage.getItem('checked');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return saved ? JSON.parse(saved) : [];
	});

	const handleToggle = (value: string) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;
		localStorage.setItem('checked', JSON.stringify(checked));

		if (checked.includes('cloudSync') && user && user.role && user.role.includes('Administrador')) {
			intervalId = setInterval(() => {
				dispatch(getQuicks());
			}, 5000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [checked, user]);

	useEffect(() => {
		/*
		Get Quicks from db
		 */
		if (user && user.role && user.role.includes('Administrador')) {
			dispatch(getQuicks());
		}
	}, [dispatch, user]);

	return (
		<StyledSwipeableDrawer
			open={state}
			anchor="right"
			onOpen={() => {}}
			onClose={() => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<FuseScrollbars>
				<ListSubheader component="div">Hoy</ListSubheader>

				<div className="mb-0 px-24 py-16">
					<Typography
						className="mb-12 text-32"
						color="text.secondary"
					>
						{format(new Date(), 'eeee', { locale: es })}
					</Typography>
					<div className="flex">
						<Typography
							className="text-32 leading-none"
							color="text.secondary"
						>
							{format(new Date(), 'dd')}
						</Typography>
						<Typography
							className="text-16 leading-none"
							color="text.secondary"
						>
							de
						</Typography>
						<Typography
							className="text-32 leading-none"
							color="text.secondary"
						>
							{format(new Date(), 'MMMM', { locale: es })}
						</Typography>
					</div>
				</div>
				<Divider />
				<List>
					<ListSubheader component="div">Eventos</ListSubheader>
					{data &&
						data.length > 0 &&
						data[0].events.map((event) => (
							<ListItem key={event.id}>
								<ListItemText
									primary={event.title}
									secondary={event.description}
								/>
							</ListItem>
						))}
					{(data.length === 0 || data[0].events.length === 0) && <ListItem>No hay eventos</ListItem>}
				</List>
				<Divider />
				<List>
					<ListSubheader component="div">Notes</ListSubheader>
					{data &&
						data.length > 0 &&
						data[0].notes.map((note) => (
							<ListItem key={note.id}>
								<ListItemText
									primary={note.title}
									secondary={note.description}
								/>
							</ListItem>
						))}
					{(data.length === 0 || data[0].notes.length === 0) && <ListItem>No hay notas</ListItem>}
				</List>
				<Divider />
				<List>
					<ListSubheader component="div">Recordatorios</ListSubheader>
					{data &&
						data.length > 0 &&
						data[0].reminders.map((note) => (
							<ListItem key={note.id}>
								<ListItemText
									primary={note.title}
									secondary={note.description}
								/>
							</ListItem>
						))}
					{(data.length === 0 || data[0].reminders.length === 0) && <ListItem>No hay recordatorios</ListItem>}
				</List>
				<Divider />
				<List>
					<ListSubheader component="div">Configuración rápida</ListSubheader>
					{/* <ListItem>
						<ListItemIcon className="min-w-40">
							<FuseSvgIcon>material-outline:notifications</FuseSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Notifications" />
						<ListItemSecondaryAction>
							<Switch
								color="primary"
								onChange={handleToggle('notifications')}
								checked={checked.indexOf('notifications') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem> */}
					<ListItem>
						<ListItemIcon className="min-w-40">
							<FuseSvgIcon>material-outline:cloud</FuseSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Cloud Sync" />
						<ListItemSecondaryAction>
							<Switch
								color="secondary"
								onChange={handleToggle('cloudSync')}
								checked={checked.indexOf('cloudSync') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					{/* <ListItem>
						<ListItemIcon className="min-w-40">
							<FuseSvgIcon>material-outline:brightness_high</FuseSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Retro Thrusters" />
						<ListItemSecondaryAction>
							<Switch
								color="primary"
								onChange={handleToggle('retroThrusters')}
								checked={checked.indexOf('retroThrusters') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem> */}
				</List>
			</FuseScrollbars>
		</StyledSwipeableDrawer>
	);
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
