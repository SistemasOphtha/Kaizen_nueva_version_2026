import { lazy } from 'react';
import i18next from 'i18next';
import lazyWithReducer from 'app/store/lazyWithReducer';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
import reducer from './store';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'justificationPage', en);
i18next.addResourceBundle('es', 'justificationPage', es);

const JustificationApp = lazyWithReducer('justificationsApp', () => import('./JustificationApp'), reducer);
const Justification = lazy(() => import('./Justification/Justification'));
const Justifications = lazy(() => import('./Justifications/Justifications'));

/**
 * The JustificationPartie page config.
 */
const JustificationConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'apps/justifications',
			element: <JustificationApp />,
			children: [
				{
					path: '',
					element: <Justifications />
				},
				{
					path: ':justificationId',
					element: <Justification />
				},
				{
					path: ':justificationId/:thirdId',
					element: <Justification />
				}
			]
		}
	]
};

export default JustificationConfig;
