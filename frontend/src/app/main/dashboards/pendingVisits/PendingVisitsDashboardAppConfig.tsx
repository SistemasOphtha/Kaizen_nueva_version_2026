import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

const PendingVisitsDashboardApp = lazyWithReducer(
	'pendingVisitsDashboardApp',
	() => import('./PendingVisitsDashboardApp'),
	reducer
);

/**
 * The pendingVisits dashboard app config.
 */
const PendingVisitsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/pending-visits',
			element: <PendingVisitsDashboardApp />
		}
	]
};

export default PendingVisitsDashboardAppConfig;
