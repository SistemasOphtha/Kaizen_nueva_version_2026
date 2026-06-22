import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import justifications, { justificationsSliceType } from './justificationsSlice';
import justification, { justificationSliceType } from './justificationSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	justifications,
	justification
});

export default reducer;

export type AppRootStateType = RootStateType<[justificationsSliceType, justificationSliceType]>;
