import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import visits, { visitsSliceType } from './visitsSlice';
import visit, { visitSliceType } from './visitSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	visits,
	visit
});

export default reducer;

export type AppRootStateType = RootStateType<[visitsSliceType, visitSliceType]>;
