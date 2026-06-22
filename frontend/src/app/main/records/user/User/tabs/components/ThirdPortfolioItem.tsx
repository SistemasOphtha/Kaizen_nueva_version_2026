import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
// import Button from '@mui/material/Button';
import ConfirmDialog from 'app/shared-components/ConfirmDialog';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { ThirdPortfolioType } from '../../../types/UserType';

type ThirdPortfolioProps = {
	item: ThirdPortfolioType;
	userId: number;
	approvePanel: (userId: number, panelId: number) => void;
	desapprovePanel: (userId: number, panelId: number) => void;
	unassignPanelHandler: (thirdId: number, userId: number) => void;
 	selected?: boolean;
	onToggleSelected?: (panelId: number) => void;
};

/**
 * The ThirdPortfolio item.
 */
function ThirdPortfolioItem(props: ThirdPortfolioProps) {
	const { item, userId, approvePanel, desapprovePanel, unassignPanelHandler, selected, onToggleSelected } = props;
	const [openDialog, setOpenDialog] = useState(false);

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	function handleConfirm() {
		unassignPanelHandler(item.third.id, userId);
	}

	return (
		<>
			<ListItem
				key={item.id}
				alignItems="flex-start"
				secondaryAction={
					<>
						<IconButton
							edge="end"
							aria-label="delete"
						>
							{item.approved ? (
								<FuseSvgIcon
									title="Desaprobar"
									color="warning"
									onClick={() => desapprovePanel(userId, item.third.id)}
								>
									heroicons-outline:thumb-down
								</FuseSvgIcon>
							) : (
								<FuseSvgIcon
									title="Aprobar"
									color="success"
									onClick={() => approvePanel(userId, item.third.id)}
								>
									heroicons-outline:thumb-up
								</FuseSvgIcon>
							)}
						</IconButton>
						<IconButton
							edge="end"
							aria-label="delete"
						>
							<FuseSvgIcon
								title="Desasociar"
								color="error"
								onClick={() => handleOpenDialog()}
							>
								heroicons-outline:trash
							</FuseSvgIcon>
						</IconButton>
					</>
				}
			>
				<Checkbox
					edge="start"
					checked={Boolean(selected)}
					onChange={() => onToggleSelected && onToggleSelected(item.third.id)}
					tabIndex={-1}
					disableRipple
				/>
				<ListItemAvatar>
					<Avatar
						alt={item.third.name}
						src=""
					/>
				</ListItemAvatar>
				<ListItemText
					primary={`${item.third.name} ${item.third.additionalName}`}
					secondary={
						<Typography
							sx={{ display: 'flex', gap: 2 }}
							component="span"
							variant="body2"
							color="text.primary"
						>
							Impacto: {item.third.impact}
							{item.approved ? (
								<Chip
									label="Aprobado"
									size="small"
									color="success"
								/>
							) : (
								<Chip
									label="Pendiente"
									size="small"
									color="warning"
								/>
							)}
						</Typography>
					}
				/>
			</ListItem>
			<ConfirmDialog
				open={openDialog}
				handleConfirm={handleConfirm}
				handleClose={handleCloseDialog}
			/>
		</>
	);
}

export default ThirdPortfolioItem;
