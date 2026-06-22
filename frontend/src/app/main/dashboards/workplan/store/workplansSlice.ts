import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addWorkplan, removeWorkplan, updateWorkplan } from './workplanSlice';
import { WorkplanType, WorkplansType } from '../types/WorkplanType';
import { AppRootStateType } from '.';

/**
 * Get workplans from server
 */
export const getWorkplans = createAppAsyncThunk<WorkplansType>('workplansApp/workplans/getWorkplans', async () => {
	const response = await axios.get('/api/workplans');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as WorkplansType;

	return data;
});

export const getWorkplansForRangeDate = createAppAsyncThunk<
	WorkplansType,
	{ startDate: string; endDate: string; filter: string }
>('workplansApp/workplans/getWorkplansForRangeDate', async ({ startDate, endDate, filter }) => {
	const response = await axios.get(`/api/workplans?startDate=${startDate}&endDate=${endDate}&filter=${filter}`);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as WorkplansType;

	return data;
});

const workplansAdapter = createEntityAdapter<WorkplanType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.workplansApp?.workplans?.searchText;

export const { selectAll: selectWorkplans, selectById: selectWorkplansById } = workplansAdapter.getSelectors(
	(state: AppRootStateType) => state.workplansApp?.workplans
);

export const selectFilteredWorkplans = createSelector([selectWorkplans, selectSearchText], (workplans, searchText) => {
	if (searchText.length === 0) {
		return workplans;
	}
	return FuseUtils.filterArrayByString(workplans, searchText);
});

type GroupedWorkplansType = {
	group: string;
	children?: WorkplanType[];
};

type AccumulatorType = {
	[key: string]: GroupedWorkplansType;
};

/**
 * Select grouped workplans
 */
export const selectGroupedFilteredWorkplans = createSelector([selectFilteredWorkplans], (workplans) => {
	const groupedObject = workplans
		.sort((a, b) => a.description.localeCompare(b.description, 'es', { sensitivity: 'base' }))
		.reduce<AccumulatorType>((r, e) => {
			// get first letter of name of current element
			const group = e.description[0];

			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, children: [e] };
			// if there is push current element to children array for that letter
			else {
				r[group]?.children?.push(e);
			}

			// return accumulator
			return r;
		}, {});

	return groupedObject;
});

const initialState = workplansAdapter.getInitialState({
	searchText: ''
});

/**
 * The Workplans App Workplans slice.
 */
export const workplansSlice = createSlice({
	name: 'workplansApp/workplans',
	initialState,
	reducers: {
		setWorkplansSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateWorkplan.fulfilled, (state, action) => workplansAdapter.upsertOne(state, action.payload))
			.addCase(addWorkplan.fulfilled, (state, action) => workplansAdapter.addOne(state, action.payload))
			.addCase(removeWorkplan.fulfilled, (state, action) => workplansAdapter.removeOne(state, action.payload))
			.addCase(getWorkplans.fulfilled, (state, action) => {
				workplansAdapter.setAll(state, action.payload);
				state.searchText = '';
			})
			.addCase(getWorkplansForRangeDate.fulfilled, (state, action) => {
				workplansAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setWorkplansSearchText } = workplansSlice.actions;

export type workplansSliceType = typeof workplansSlice;

export default workplansSlice.reducer;
