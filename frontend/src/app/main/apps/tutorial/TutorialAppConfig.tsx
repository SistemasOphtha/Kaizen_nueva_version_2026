import { lazy } from 'react';
import authRoles from '../../../auth/authRoles';

const TutorialApp = lazy(() => import('./TutorialApp'));

/**
 * The Tutorial App Config.
 */
const TutorialAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'apps/tutorial',
			element: <TutorialApp />
		}
	]
};

export default TutorialAppConfig;
