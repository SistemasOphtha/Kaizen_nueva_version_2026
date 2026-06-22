import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addThirdRegion, removeThirdRegion, updateThirdRegion } from './thirdRegionSlice';
import { ThirdRegionType, ThirdRegionsType } from '../types/ThirdRegionType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdRegions = createAppAsyncThunk<ThirdRegionsType>(
	'thirdsApp/thirdRegions/getThirdRegions',
	async () => {
		const response = await axios.get('/api/third-regions');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdRegionsType;

		return data;
	}
);

/**
 * Remove third regions
 */
export const removeThirdRegions = createAppAsyncThunk<string[], string[]>(
	'thirdsApp/thirdRegions',
	async (thirdRegionsIds) => {
		await axios.delete('/api/third-regions', { data: thirdRegionsIds });

		return thirdRegionsIds;
	}
);

const thirdRegionsAdapter = createEntityAdapter<ThirdRegionType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirdRegions?.searchText;

export const { selectAll: selectThirdRegions, selectById: selectThirdsById } = thirdRegionsAdapter.getSelectors(
	(state: AppRootStateType) => state.thirdsApp?.thirdRegions
);

export const selectFilteredThirdRegions = createSelector(
	[selectThirdRegions, selectSearchText],
	(regions: ThirdRegionsType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return regions;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(regions, searchText);
	}
);

type GroupedThirdsType = {
	group: string;
	children?: ThirdRegionType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredThirdRegions = createSelector([selectFilteredThirdRegions], (types) => {
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
});

const initialState = thirdRegionsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdRegionsSlice = createSlice({
	name: 'thirdsApp/thirdRegions',
	initialState,
	reducers: {
		setThirdRegionsSearchText: {
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
			.addCase(updateThirdRegion.fulfilled, (state, action) =>
				thirdRegionsAdapter.upsertOne(state, action.payload)
			)
			.addCase(addThirdRegion.fulfilled, (state, action) => thirdRegionsAdapter.addOne(state, action.payload))
			.addCase(removeThirdRegion.fulfilled, (state, action) =>
				thirdRegionsAdapter.removeOne(state, action.payload)
			)
			.addCase(getThirdRegions.fulfilled, (state, action) => {
				thirdRegionsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setThirdRegionsSearchText } = thirdRegionsSlice.actions;

export type thirdRegionsSliceType = typeof thirdRegionsSlice;

export default thirdRegionsSlice.reducer;
