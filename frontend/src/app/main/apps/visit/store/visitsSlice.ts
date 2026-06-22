import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addVisit, removeVisit, updateVisit } from './visitSlice';
import { VisitType, VisitsType } from '../types/VisitType';
import { AppRootStateType } from '.';

/**
 * Get visits from server
 */
export const getVisits = createAppAsyncThunk<VisitsType>('visitsApp/visits/getVisits', async () => {
	const response = await axios.get('/api/visits');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as VisitsType;

	return data;
});

const visitsAdapter = createEntityAdapter<VisitType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.visitsApp?.visits?.searchText;

export const { selectAll: selectVisits, selectById: selectVisitsById } = visitsAdapter.getSelectors(
	(state: AppRootStateType) => state.visitsApp?.visits
);

export const selectFilteredVisits = createSelector([selectVisits, selectSearchText], (visits, searchText) => {
	if (searchText.length === 0) {
		return visits;
	}
	return FuseUtils.filterArrayByString(visits, searchText);
});

type GroupedVisitsType = {
	group: string;
	children?: VisitType[];
};

type AccumulatorType = {
	[key: string]: GroupedVisitsType;
};

/**
 * Select grouped visits
 */
export const selectGroupedFilteredVisits = createSelector([selectFilteredVisits], (visits) => {
	const groupedObject = visits
		.sort((a, b) => a.objective.localeCompare(b.objective, 'es', { sensitivity: 'base' }))
		.reduce<AccumulatorType>((r, e) => {
			// get first letter of name of current element
			const group = e.objective[0];

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

const initialState = visitsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Visits App Visits slice.
 */
export const visitsSlice = createSlice({
	name: 'visitsApp/visits',
	initialState,
	reducers: {
		setVisitsSearchText: {
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
			.addCase(updateVisit.fulfilled, (state, action) => visitsAdapter.upsertOne(state, action.payload))
			.addCase(addVisit.fulfilled, (state, action) => visitsAdapter.addOne(state, action.payload))
			.addCase(removeVisit.fulfilled, (state, action) => visitsAdapter.removeOne(state, action.payload))
			.addCase(getVisits.fulfilled, (state, action) => {
				visitsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setVisitsSearchText } = visitsSlice.actions;

export type visitsSliceType = typeof visitsSlice;

export default visitsSlice.reducer;
