import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

// import reducer from './store';
// import CalendarApp from '../calendar/CalendarApp';

import reducer from '../apps/calendar/store';
import lazyWithReducer from '../../store/lazyWithReducer';

const CalendarApp = lazyWithReducer('calendarApp', () => import('../apps/calendar/CalendarApp'), reducer);

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Home() {
	const { t } = useTranslation('homePage');

	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			content={
				<div className="p-24">
					<CalendarApp />
				</div>
			}
		/>
	);
}

export default Home;
