import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../../auth/authRoles';

// i18next.addResourceBundle('en', 'resetPasswordPage', en);
// i18next.addResourceBundle('es', 'resetPasswordPage', es);

const Config = lazy(() => import('./Config/Config'));
const Holidays = lazy(() => import('./Holidays/Holidays'));
const Communications = lazy(() => import('./Communications/Communications'));
const ConfigApp = lazy(() => import('./ConfigApp'));

/**
 * The user page config.
 */
const ConfigAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: 'settings',
			element: <ConfigApp />,
			children: [
				{
					path: '',
					element: <Navigate to="general" />
				},
				{
					path: 'general',
					element: <Config />
				},
				{
					path: 'holidays',
					element: <Holidays />
				},
				{
					path: 'communications',
					element: <Communications />
				}
			]
		}
	]
};

export default ConfigAppConfig;
