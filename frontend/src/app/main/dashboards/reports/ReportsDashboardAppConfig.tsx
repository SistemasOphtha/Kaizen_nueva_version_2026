import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

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
	routes: [
		{
			path: 'dashboards/reports',
			element: <ReportsDashboardApp />
		}
	]
};

export default ReportsDashboardAppConfig;
