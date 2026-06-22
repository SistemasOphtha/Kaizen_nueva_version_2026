import { lazy } from 'react';
// import i18next from 'i18next';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
// import en from './i18n/en';
// import es from './i18n/es';

// i18next.addResourceBundle('en', 'resetPasswordPage', en);
// i18next.addResourceBundle('es', 'resetPasswordPage', es);

const User = lazy(() => import('./ResetPassword/Reset'));

/**
 * The user page config.
 */
const ResetPasswordAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'settings/change-password',
			element: <User />
		}
	]
};

export default ResetPasswordAppConfig;
