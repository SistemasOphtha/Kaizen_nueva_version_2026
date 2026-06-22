import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import ResetPasswordConfig from '../main/reset-password/ResetPasswordConfig';
import Error404Page from '../main/404/Error404Page';
// import HomeConfig from '../main/home/HomeConfig';
import AppsConfigs from '../main/apps/appsConfigs';
import DashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import RecordsConfigs from '../main/records/recordsConfigs';
import SettingsConfigs from '../main/settings/settingsConfigs';

const routeConfigs: FuseRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	ResetPasswordConfig,
	// HomeConfig,
	...AppsConfigs,
	...DashboardsConfigs,
	...RecordsConfigs,
	...SettingsConfigs
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
