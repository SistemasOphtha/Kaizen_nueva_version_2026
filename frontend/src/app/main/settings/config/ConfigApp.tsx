import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import ConfigTabs from './ConfigTabs';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider
  },
  '& .FusePageSimple-content': {
    backgroundColor: theme.palette.background.paper
  }
}));

function ConfigApp() {
	return (
		<Root
			header={
				<div className="flex flex-col w-full">
					<div className="flex flex-col sm:flex-row items-center justify-between py-24 px-24 md:px-32">
						<Typography
							component="h1"
							variant="h4"
							className="flex-1 text-center md:text-left"
						>
							Configuraciones
						</Typography>
					</div>
					<div className="px-24 md:px-32">
						<ConfigTabs />
					</div>
				</div>
			}
			content={<div className="p-24"><Outlet /></div>}
			scroll="content"
		/>
	);
}

export default ConfigApp;
