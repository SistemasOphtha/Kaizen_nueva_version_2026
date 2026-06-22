import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addThirdSpecialty, removeThirdSpecialty, updateThirdSpecialty } from './thirdSpecialtySlice';
import { ThirdSpecialtyType, ThirdSpecialtysType } from '../types/ThirdSpecialtyType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdSpecialtys = createAppAsyncThunk<ThirdSpecialtysType>(
	'thirdsApp/thirdSpecialtys/getThirdSpecialtys',
	async () => {
		const response = await axios.get('/api/third-specialtys');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdSpecialtysType;

		return data;
	}
);

/**
 * Remove third specialtys
 */
export const removeThirdSpecialtys = createAppAsyncThunk<string[], string[]>(
	'thirdsApp/thirdSpecialtys',
	async (thirdSpecialtysIds) => {
		await axios.delete('/api/third-specialtys', { data: thirdSpecialtysIds });

		return thirdSpecialtysIds;
	}
);

const thirdSpecialtysAdapter = createEntityAdapter<ThirdSpecialtyType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirdSpecialtys?.searchText;

export const { selectAll: selectThirdSpecialtys, selectById: selectThirdsById } = thirdSpecialtysAdapter.getSelectors(
	(state: AppRootStateType) => state.thirdsApp?.thirdSpecialtys
);

export const selectFilteredThirdSpecialtys = createSelector(
	[selectThirdSpecialtys, selectSearchText],
	(specialtys: ThirdSpecialtysType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return specialtys;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(specialtys, searchText);
	}
);

type GroupedThirdsType = {
	group: string;
	children?: ThirdSpecialtyType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredThirdSpecialtys = createSelector([selectFilteredThirdSpecialtys], (types) => {
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

const initialState = thirdSpecialtysAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdSpecialtysSlice = createSlice({
	name: 'thirdsApp/thirdSpecialtys',
	initialState,
	reducers: {
		setThirdSpecialtysSearchText: {
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
			.addCase(updateThirdSpecialty.fulfilled, (state, action) =>
				thirdSpecialtysAdapter.upsertOne(state, action.payload)
			)
			.addCase(addThirdSpecialty.fulfilled, (state, action) =>
				thirdSpecialtysAdapter.addOne(state, action.payload)
			)
			.addCase(removeThirdSpecialty.fulfilled, (state, action) =>
				thirdSpecialtysAdapter.removeOne(state, action.payload)
			)
			.addCase(getThirdSpecialtys.fulfilled, (state, action) => {
				thirdSpecialtysAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setThirdSpecialtysSearchText } = thirdSpecialtysSlice.actions;

export type thirdSpecialtysSliceType = typeof thirdSpecialtysSlice;

export default thirdSpecialtysSlice.reducer;
