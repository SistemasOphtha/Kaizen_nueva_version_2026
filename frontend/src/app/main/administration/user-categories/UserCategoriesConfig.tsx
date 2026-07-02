import { lazy } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';

const UserCategories = lazy(() => import('./UserCategories'));

const UserCategoriesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'administration/user-categories',
			element: withReducer('userCategoriesModule', reducer)(<UserCategories />)
		}
	]
};

export default UserCategoriesConfig;
