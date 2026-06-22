import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

const TrackingAlertDashboardApp = lazyWithReducer(
	'trackingAlertDashboardApp',
	() => import('./TrackingAlertDashboardApp'),
	reducer
);

/**
 * The trackingAlert dashboard app config.
 */
const TrackingAlertDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/tracking-alerts',
			element: <TrackingAlertDashboardApp />
		}
	]
};

export default TrackingAlertDashboardAppConfig;
