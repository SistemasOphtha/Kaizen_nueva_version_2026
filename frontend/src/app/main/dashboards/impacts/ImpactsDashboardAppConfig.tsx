import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

const ImpactsDashboardApp = lazyWithReducer('impactsDashboardApp', () => import('./ImpactsDashboardApp'), reducer);

/**
 * The impacts dashboard app config.
 */
const ImpactsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/',
			element: <ImpactsDashboardApp />
		},
		{
			path: 'dashboards/indicators',
			element: <ImpactsDashboardApp />
		}
	]
};

export default ImpactsDashboardAppConfig;
