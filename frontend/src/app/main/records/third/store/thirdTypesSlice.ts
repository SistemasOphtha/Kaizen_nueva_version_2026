import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addThirdType, removeThirdType, updateThirdType } from './thirdTypeSlice';
import { ThirdTypeType, ThirdTypesType } from '../types/ThirdTypeType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdTypes = createAppAsyncThunk<ThirdTypesType>('thirdsApp/thirdTypes/getThirdTypes', async () => {
	const response = await axios.get('/api/third-types');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as ThirdTypesType;

	return data;
});

/**
 * Remove third types
 */
export const removeThirdTypes = createAppAsyncThunk<string[], string[]>(
	'thirdsApp/thirdTypes',
	async (thirdTypesIds) => {
		await axios.delete('/api/third-types', { data: thirdTypesIds });

		return thirdTypesIds;
	}
);

const thirdTypesAdapter = createEntityAdapter<ThirdTypeType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirdTypes?.searchText;

export const { selectAll: selectThirdTypes, selectById: selectThirdsById } = thirdTypesAdapter.getSelectors(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
	(state: AppRootStateType) => state.thirdsApp?.thirdTypes || thirdTypesAdapter.getInitialState()
);

export const selectFilteredThirdTypes = createSelector([selectThirdTypes, selectSearchText], (types, searchText) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (searchText.length === 0) {
		return types;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return FuseUtils.filterArrayByString(types, searchText);
});

type GroupedThirdsType = {
	group: string;
	children?: ThirdTypeType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredThirdTypes = createSelector([selectFilteredThirdTypes], (types) => {
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

const initialState = thirdTypesAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdTypesSlice = createSlice({
	name: 'thirdsApp/thirdTypes',
	initialState,
	reducers: {
		setThirdTypesSearchText: {
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
			.addCase(updateThirdType.fulfilled, (state, action) => thirdTypesAdapter.upsertOne(state, action.payload))
			.addCase(addThirdType.fulfilled, (state, action) => thirdTypesAdapter.addOne(state, action.payload))
			.addCase(removeThirdType.fulfilled, (state, action) => thirdTypesAdapter.removeOne(state, action.payload))
			.addCase(getThirdTypes.fulfilled, (state, action) => {
				thirdTypesAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setThirdTypesSearchText } = thirdTypesSlice.actions;

export type thirdTypesSliceType = typeof thirdTypesSlice;

export default thirdTypesSlice.reducer;
