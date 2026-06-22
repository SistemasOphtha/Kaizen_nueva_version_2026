import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import users, { usersSliceType } from './usersSlice';
import user, { userSliceType } from './userSlice';
import userClassification, { userClassificationSliceType } from './userClassificationSlice';
import userClassifications, { userClassificationsSliceType } from './userClassificationsSlice';
import userRegion, { userRegionSliceType } from './userRegionSlice';
import userRegions, { userRegionsSliceType } from './userRegionsSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	users,
	user,
	userClassification,
	userClassifications,
	userRegions,
	userRegion
});

export default reducer;

export type AppRootStateType = RootStateType<
	[
		usersSliceType,
		userSliceType,
		userClassificationSliceType,
		userClassificationsSliceType,
		userRegionsSliceType,
		userRegionSliceType
	]
>;
