import { lazy } from 'react';
import authRoles from '../../../auth/authRoles';

const BirthdaysConfigApp = lazy(() => import('./BirthdaysConfigApp'));

const BirthdaysConfigAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: 'communications/birthdays',
			element: <BirthdaysConfigApp />
		}
	]
};

export default BirthdaysConfigAppConfig;
