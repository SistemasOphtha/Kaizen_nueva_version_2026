import { lazy } from 'react';
import i18next from 'i18next';
import lazyWithReducer from 'app/store/lazyWithReducer';
import authRoles from '../../../auth/authRoles';
// import { Navigate } from 'react-router-dom';
import reducer from './store';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'userPage', en);
i18next.addResourceBundle('es', 'userPage', es);

const UserApp = lazyWithReducer('usersApp', () => import('./UserApp'), reducer);
const User = lazy(() => import('./User/User'));
const Users = lazy(() => import('./Users/Users'));
const UserClassification = lazy(() => import('./UserClassification/UserClassification'));
const UserClassifications = lazy(() => import('./UserClassifications/UserClassifications'));
const SessionLogs = lazy(() => import('./SessionLogs/SessionLogs'));

/**
 * The user page config.
 */
const userConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: 'records/users',
			element: <UserApp />,
			children: [
				{
					path: '',
					element: <Users />
				},
				{
					path: 'session-logs',
					element: <SessionLogs />
				},
				{
					path: ':userId',
					element: <User />
				},
				{
					path: 'user-classifications',
					element: <UserClassifications />
				},
				{
					path: 'user-classifications/:userClassificationId',
					element: <UserClassification />
				}
			]
		}
	]
};

export default userConfig;
