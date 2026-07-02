import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import { useAppSelector } from 'app/store';
import { selectUser } from 'app/store/user/userSlice';
// import { useAppDispatch } from 'app/store';
// import { removeThird } from '../store/thirdSlice';

/**
 * The table head row type.
 */
type rowType = {
	id: string;
	align: 'left' | 'center' | 'right';
	disablePadding: boolean;
	label: string;
	sort: boolean;
};

/**
 * The table head rows data.
 */
const rows: rowType[] = [
	{
		id: 'typeId',
		align: 'left',
		disablePadding: true,
		label: 'Tipo de panel',
		sort: true
	},
	{
		id: 'typeIdentification',
		align: 'left',
		disablePadding: true,
		label: 'Tipo de identificación',
		sort: true
	},
	{
		id: 'identification',
		align: 'left',
		disablePadding: true,
		label: 'Identificación',
		sort: true
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Nombre',
		sort: true
	},
	{
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'Estado',
		sort: true
	},
	{
		id: 'city',
		align: 'left',
		disablePadding: false,
		label: 'Ciudad',
		sort: true
	},
	{
		id: 'address',
		align: 'left',
		disablePadding: false,
		label: 'Dirección',
		sort: false
	},
	{
		id: 'phone',
		align: 'left',
		disablePadding: false,
		label: 'Teléfono',
		sort: true
	},
	{
		id: 'impact',
		align: 'left',
		disablePadding: false,
		label: 'Impacto',
		sort: true
	}
];

type ThirdsTableHeadPropsType = {
	selectedThirdIds: string[];
	onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	tableOrder: {
		direction: 'asc' | 'desc';
		id: string;
	};
	rowCount: number;
	onMenuItemClick: () => void;
	onAssignMenuItemClick: () => void;
};

/**
 * The products table head component.
 */
function ThirdsTableHead(props: ThirdsTableHeadPropsType) {
	const { selectedThirdIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	const numSelected = selectedThirdIds.length;

	const [selectedThirdsMenu, setSelectedThirdsMenu] = useState<HTMLButtonElement | null>(null);

	// const dispatch = useAppDispatch();
	const { role } = useAppSelector(selectUser);

	const createSortHandler = (event: MouseEvent<HTMLSpanElement>, property: string) => {
		onRequestSort(event, property);
	};

	function openSelectedThirdsMenu(event: MouseEvent<HTMLButtonElement>) {
		setSelectedThirdsMenu(event.currentTarget);
	}

	function closeSelectedThirdsMenu() {
		setSelectedThirdsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? lighten(theme.palette.background.default, 0.4)
								: lighten(theme.palette.background.default, 0.02)
					}}
					padding="none"
					className="w-40 md:w-64 text-center z-99"
				>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount !== 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
					{numSelected > 0 && (
						<Box
							className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
							sx={{
								background: (theme) => theme.palette.background.default
							}}
						>
							<IconButton
								aria-haspopup="true"
								onClick={openSelectedThirdsMenu}
								size="large"
							>
								<FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
							</IconButton>
							<Menu
								id="selectedThirdsMenu"
								anchorEl={selectedThirdsMenu}
								open={Boolean(selectedThirdsMenu)}
								onClose={closeSelectedThirdsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											props.onAssignMenuItemClick();
											closeSelectedThirdsMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<FuseSvgIcon>heroicons-outline:user-add</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText primary="Asignar a Representante" />
									</MenuItem>
									<MenuItem
										onClick={() => {
											// dispatch(removeThirds(selectedThirdIds));
											onMenuItemClick();
											closeSelectedThirdsMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</Box>
					)}
				</TableCell>
				{rows.map((row) => {
					if (role.includes('Representante') && row.id === 'status') {
						return (
							<TableCell
								sx={{
									backgroundColor: (theme) =>
										theme.palette.mode === 'light'
											? lighten(theme.palette.background.default, 0.4)
											: lighten(theme.palette.background.default, 0.02)
								}}
								className="p-4 md:p-16"
								key={row.id}
								align={row.align}
								padding={row.disablePadding ? 'none' : 'normal'}
								sortDirection={tableOrder.id === row.id ? tableOrder.direction : false}
							>
								{row.sort ? (
									<Tooltip
										title="Sort"
										placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={tableOrder.id === row.id}
											direction={tableOrder.direction}
											onClick={(ev: MouseEvent<HTMLSpanElement>) => createSortHandler(ev, row.id)}
											className="font-semibold"
										>
											{row.label}
										</TableSortLabel>
									</Tooltip>
								) : (
									row.label
								)}
							</TableCell>
						);
					}
					if (row.id !== 'status') {
						return (
							<TableCell
								sx={{
									backgroundColor: (theme) =>
										theme.palette.mode === 'light'
											? lighten(theme.palette.background.default, 0.4)
											: lighten(theme.palette.background.default, 0.02)
								}}
								className="p-4 md:p-16"
								key={row.id}
								align={row.align}
								padding={row.disablePadding ? 'none' : 'normal'}
								sortDirection={tableOrder.id === row.id ? tableOrder.direction : false}
							>
								{row.sort ? (
									<Tooltip
										title="Sort"
										placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={tableOrder.id === row.id}
											direction={tableOrder.direction}
											onClick={(ev: MouseEvent<HTMLSpanElement>) => createSortHandler(ev, row.id)}
											className="font-semibold"
										>
											{row.label}
										</TableSortLabel>
									</Tooltip>
								) : (
									row.label
								)}
							</TableCell>
						);
					}
					return null;
				})}
			</TableRow>
		</TableHead>
	);
}

export default ThirdsTableHead;
