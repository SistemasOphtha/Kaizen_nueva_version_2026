import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import {
	addThirdClassification,
	removeThirdClassification,
	updateThirdClassification
} from './thirdClassificationSlice';
import { ThirdClassificationType, ThirdClassificationsType } from '../types/ThirdClassificationType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdClassifications = createAppAsyncThunk<ThirdClassificationsType>(
	'thirdsApp/thirdClassifications/getThirdClassifications',
	async () => {
		const response = await axios.get('/api/third-classifications');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdClassificationsType;

		return data;
	}
);

/**
 * Remove third classifications
 */
export const removeThirdClassifications = createAppAsyncThunk<string[], string[]>(
	'thirdsApp/thirdClassifications',
	async (thirdClassificationsIds) => {
		await axios.delete('/api/third-classifications', { data: thirdClassificationsIds });

		return thirdClassificationsIds;
	}
);

const thirdClassificationsAdapter = createEntityAdapter<ThirdClassificationType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirdClassifications?.searchText;

export const { selectAll: selectThirdClassifications, selectById: selectThirdsById } =
	thirdClassificationsAdapter.getSelectors((state: AppRootStateType) => state.thirdsApp?.thirdClassifications);

export const selectFilteredThirdClassifications = createSelector(
	[selectThirdClassifications, selectSearchText],
	(classifications: ThirdClassificationsType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return classifications;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(classifications, searchText);
	}
);

type GroupedThirdsType = {
	group: string;
	children?: ThirdClassificationType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredThirdClassifications = createSelector(
	[selectFilteredThirdClassifications],
	(types) => {
		const groupedObject = types
			.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
			.reduce<AccumulatorType>((r, e) => {
				// get first letter of name of current element
				const group = e.name[0];

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
	}
);

const initialState = thirdClassificationsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdClassificationsSlice = createSlice({
	name: 'thirdsApp/thirdClassifications',
	initialState,
	reducers: {
		setThirdClassificationsSearchText: {
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
			.addCase(updateThirdClassification.fulfilled, (state, action) =>
				thirdClassificationsAdapter.upsertOne(state, action.payload)
			)
			.addCase(addThirdClassification.fulfilled, (state, action) =>
				thirdClassificationsAdapter.addOne(state, action.payload)
			)
			.addCase(removeThirdClassification.fulfilled, (state, action) =>
				thirdClassificationsAdapter.removeOne(state, action.payload)
			)
			.addCase(getThirdClassifications.fulfilled, (state, action) => {
				thirdClassificationsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setThirdClassificationsSearchText } = thirdClassificationsSlice.actions;

export type thirdClassificationsSliceType = typeof thirdClassificationsSlice;

export default thirdClassificationsSlice.reducer;
