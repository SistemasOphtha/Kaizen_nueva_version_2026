import { lazy } from 'react';
import i18next from 'i18next';
import lazyWithReducer from 'app/store/lazyWithReducer';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
import reducer from './store';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'visitPartiePage', en);
i18next.addResourceBundle('es', 'visitPartiePage', es);

const VisitApp = lazyWithReducer('visitsApp', () => import('./VisitApp'), reducer);
const Visit = lazy(() => import('./Visit/Visit'));
const Visits = lazy(() => import('./Visits/Visits'));

/**
 * The VisitPartie page config.
 */
const VisitConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'apps/visits',
			element: <VisitApp />,
			children: [
				{
					path: '',
					element: <Visits />
				},
				{
					path: ':visitId',
					element: <Visit />
				},
				{
					path: ':visitId/:thirdId',
					element: <Visit />
				}
			]
		}
	]
};

export default VisitConfig;
