import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addJustification, removeJustification, updateJustification } from './justificationSlice';
import { JustificationType, JustificationsType } from '../types/JustificationType';
import { AppRootStateType } from '.';

/**
 * Get justifications from server
 */
export const getJustifications = createAppAsyncThunk<JustificationsType, { userId?: number; regionId?: number } | undefined>(
	'justificationsApp/justifications/getJustifications',
	async (params) => {
		const response = await axios.get('/api/justifications', { params });
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as JustificationsType;

		return data;
	}
);

const justificationsAdapter = createEntityAdapter<JustificationType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.justificationsApp?.justifications?.searchText;

export const { selectAll: selectJustifications, selectById: selectJustificationsById } =
	justificationsAdapter.getSelectors((state: AppRootStateType) => state.justificationsApp?.justifications);

export const selectFilteredJustifications = createSelector(
	[selectJustifications, selectSearchText],
	(justifications, searchText) => {
		if (searchText.length === 0) {
			return justifications;
		}
		return FuseUtils.filterArrayByString(justifications, searchText);
	}
);

type GroupedJustificationsType = {
	group: string;
	children?: JustificationType[];
};

type AccumulatorType = {
	[key: string]: GroupedJustificationsType;
};

/**
 * Select grouped justifications
 */
export const selectGroupedFilteredJustifications = createSelector([selectFilteredJustifications], (justifications) => {
	const groupedObject = justifications
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

const initialState = justificationsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Justifications App Justifications slice.
 */
export const justificationsSlice = createSlice({
	name: 'justificationsApp/justifications',
	initialState,
	reducers: {
		setJustificationsSearchText: {
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
			.addCase(updateJustification.fulfilled, (state, action) =>
				justificationsAdapter.upsertOne(state, action.payload)
			)
			.addCase(addJustification.fulfilled, (state, action) => justificationsAdapter.addOne(state, action.payload))
			.addCase(removeJustification.fulfilled, (state, action) =>
				justificationsAdapter.removeOne(state, action.payload)
			)
			.addCase(getJustifications.fulfilled, (state, action) => {
				justificationsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setJustificationsSearchText } = justificationsSlice.actions;

export type justificationsSliceType = typeof justificationsSlice;

export default justificationsSlice.reducer;
