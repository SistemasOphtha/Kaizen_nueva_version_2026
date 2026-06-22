import { lazy } from 'react';
import i18next from 'i18next';
import lazyWithReducer from 'app/store/lazyWithReducer';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
import reducer from './store';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'workplanPage', en);
i18next.addResourceBundle('es', 'workplanPage', es);

const WorkplanApp = lazyWithReducer('workplansApp', () => import('./WorkplanApp'), reducer);
const Workplan = lazy(() => import('./Workplan/Workplan'));
const Workplans = lazy(() => import('./Workplans/Workplans'));

/**
 * The WorkplanPartie page config.
 */
const WorkplanConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'apps/workplans',
			element: <WorkplanApp />,
			children: [
				{
					path: '',
					element: <Workplans />
				},
				{
					path: ':workplanId',
					element: <Workplan />
				}
			]
		}
	]
};

export default WorkplanConfig;
