import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import config, { configSliceType } from './configSlice';
import configs, { configsSliceType } from './configsSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	config,
	configs
});

export default reducer;

export type AppRootStateType = RootStateType<[configSliceType, configsSliceType]>;
