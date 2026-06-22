import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../../auth/authRoles';

// i18next.addResourceBundle('en', 'resetPasswordPage', en);
// i18next.addResourceBundle('es', 'resetPasswordPage', es);

const Config = lazy(() => import('./Config/Config'));
const Holidays = lazy(() => import('./Holidays/Holidays'));
const ConfigApp = lazy(() => import('./ConfigApp'));

/**
 * The user page config.
 */
const ConfigAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
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
				}
			]
		}
	]
};

export default ConfigAppConfig;
