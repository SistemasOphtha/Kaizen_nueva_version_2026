import { lazy } from 'react';
import i18next from 'i18next';
import lazyWithReducer from 'app/store/lazyWithReducer';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
import reducer from './store';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'thirdPage', en);
i18next.addResourceBundle('es', 'thirdPage', es);

const ThirdApp = lazyWithReducer('thirdsApp', () => import('./ThirdApp'), reducer);
const Third = lazy(() => import('./Third/Third'));
const Thirds = lazy(() => import('./Thirds/Thirds'));

/**
 * The ThirdPartie page config.
 */
const ThirdPartieConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: 'records/thirds',
			element: <ThirdApp />,
			children: [
				{
					path: '',
					element: <Thirds />
				},
				{
					path: ':thirdId',
					element: <Third />
				}
			]
		}
	]
};

export default ThirdPartieConfig;
