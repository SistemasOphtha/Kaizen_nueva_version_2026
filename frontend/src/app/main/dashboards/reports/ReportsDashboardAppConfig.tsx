import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';
import authRoles from '../../../auth/authRoles';

const ReportsDashboardApp = lazyWithReducer('reportsDashboardApp', () => import('./ReportsDashboardApp'), reducer);

/**
 * The reports dashboard app config.
 */
const ReportsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: 'dashboards/reports',
			element: <ReportsDashboardApp />
		}
	]
};

export default ReportsDashboardAppConfig;
