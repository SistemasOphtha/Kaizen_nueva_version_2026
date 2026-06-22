import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import es from './i18n/es';
import authRoles from '../../auth/authRoles';

i18next.addResourceBundle('en', 'homePage', en);
i18next.addResourceBundle('es', 'homePage', es);

const Home = lazy(() => import('./Home'));

/**
 * The Example page config.
 */
const HomeConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: '/',
			element: <Home />
		}
	]
};

export default HomeConfig;
