import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addThirdSubSpecialty, removeThirdSubSpecialty, updateThirdSubSpecialty } from './thirdSubSpecialtySlice';
import { ThirdSubSpecialtyType, ThirdSubSpecialtysType } from '../types/ThirdSubSpecialtyType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdSubSpecialtys = createAppAsyncThunk<ThirdSubSpecialtysType>(
	'thirdsApp/thirdSubSpecialtys/getThirdSubSpecialtys',
	async () => {
		const response = await axios.get('/api/third-sub-specialtys');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdSubSpecialtysType;

		return data;
	}
);

/**
 * Remove third subSpecialtys
 */
export const removeThirdSubSpecialtys = createAppAsyncThunk<string[], string[]>(
	'thirdsApp/thirdSubSpecialtys',
	async (thirdSubSpecialtysIds) => {
		await axios.delete('/api/third-sub-specialtys', { data: thirdSubSpecialtysIds });

		return thirdSubSpecialtysIds;
	}
);

const thirdSubSpecialtysAdapter = createEntityAdapter<ThirdSubSpecialtyType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirdSubSpecialtys?.searchText;

export const { selectAll: selectThirdSubSpecialtys, selectById: selectThirdsById } =
	thirdSubSpecialtysAdapter.getSelectors((state: AppRootStateType) => state.thirdsApp?.thirdSubSpecialtys);

export const selectFilteredThirdSubSpecialtys = createSelector(
	[selectThirdSubSpecialtys, selectSearchText],
	(subSpecialtys: ThirdSubSpecialtysType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return subSpecialtys;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(subSpecialtys, searchText);
	}
);

type GroupedThirdsType = {
	group: string;
	children?: ThirdSubSpecialtyType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredThirdSubSpecialtys = createSelector([selectFilteredThirdSubSpecialtys], (types) => {
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

const initialState = thirdSubSpecialtysAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdSubSpecialtysSlice = createSlice({
	name: 'thirdsApp/thirdSubSpecialtys',
	initialState,
	reducers: {
		setThirdSubSpecialtysSearchText: {
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
			.addCase(updateThirdSubSpecialty.fulfilled, (state, action) =>
				thirdSubSpecialtysAdapter.upsertOne(state, action.payload)
			)
			.addCase(addThirdSubSpecialty.fulfilled, (state, action) =>
				thirdSubSpecialtysAdapter.addOne(state, action.payload)
			)
			.addCase(removeThirdSubSpecialty.fulfilled, (state, action) =>
				thirdSubSpecialtysAdapter.removeOne(state, action.payload)
			)
			.addCase(getThirdSubSpecialtys.fulfilled, (state, action) => {
				thirdSubSpecialtysAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setThirdSubSpecialtysSearchText } = thirdSubSpecialtysSlice.actions;

export type thirdSubSpecialtysSliceType = typeof thirdSubSpecialtysSlice;

export default thirdSubSpecialtysSlice.reducer;
