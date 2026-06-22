import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addUserRegion, removeUserRegion, updateUserRegion } from './userRegionSlice';
import { UserRegionType, UserRegionsType } from '../types/UserRegionType';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUserRegions = createAppAsyncThunk<UserRegionsType>('usersApp/userRegions/getUserRegions', async () => {
	const response = await axios.get('/api/user-regions');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as UserRegionsType;

	return data;
});

/**
 * Remove user regions
 */
export const removeUserRegions = createAppAsyncThunk<string[], string[]>(
	'usersApp/userRegions',
	async (userRegionsIds) => {
		await axios.delete('/api/user-regions', { data: userRegionsIds });

		return userRegionsIds;
	}
);

const userRegionsAdapter = createEntityAdapter<UserRegionType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.usersApp?.userRegions?.searchText;

export const { selectAll: selectUserRegions, selectById: selectUsersById } = userRegionsAdapter.getSelectors(
	(state: AppRootStateType) => state.usersApp?.userRegions || userRegionsAdapter.getInitialState()
);

export const selectFilteredUserRegions = createSelector(
	[selectUserRegions, selectSearchText],
	(regions: UserRegionsType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return regions;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(regions, searchText);
	}
);

type GroupedUsersType = {
	group: string;
	children?: UserRegionType[];
};

type AccumulatorType = {
	[key: string]: GroupedUsersType;
};

/**
 * Select grouped user types
 */
export const selectGroupedFilteredUserRegions = createSelector([selectFilteredUserRegions], (types) => {
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

const initialState = userRegionsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Users App Users slice.
 */
export const userRegionsSlice = createSlice({
	name: 'usersApp/userRegions',
	initialState,
	reducers: {
		setUserRegionsSearchText: {
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
			.addCase(updateUserRegion.fulfilled, (state, action) => userRegionsAdapter.upsertOne(state, action.payload))
			.addCase(addUserRegion.fulfilled, (state, action) => userRegionsAdapter.addOne(state, action.payload))
			.addCase(removeUserRegion.fulfilled, (state, action) => userRegionsAdapter.removeOne(state, action.payload))
			.addCase(getUserRegions.fulfilled, (state, action) => {
				userRegionsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setUserRegionsSearchText } = userRegionsSlice.actions;

export type userRegionsSliceType = typeof userRegionsSlice;

export default userRegionsSlice.reducer;
