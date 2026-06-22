import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import workplans, { workplansSliceType } from './workplansSlice';
import workplan, { workplanSliceType } from './workplanSlice';
import typeEvent, { typeEventSliceType } from './typeEventSlice';
import typeEvents, { typeEventsSliceType } from './typeEventsSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	workplans,
	workplan,
	typeEvent,
	typeEvents
});

export default reducer;

export type AppRootStateType = RootStateType<
	[workplansSliceType, workplanSliceType, typeEventSliceType, typeEventsSliceType]
>;
