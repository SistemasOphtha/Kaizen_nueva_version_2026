import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addUserClassification, removeUserClassification, updateUserClassification } from './userClassificationSlice';
import { UserClassificationType, UserClassificationsType } from '../types/UserClassificationType';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUserClassifications = createAppAsyncThunk<UserClassificationsType>(
	'usersApp/userClassifications/getUserClassifications',
	async () => {
		const response = await axios.get('/api/user-classifications');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as UserClassificationsType;

		return data;
	}
);

/**
 * Remove user classifications
 */
export const removeUserClassifications = createAppAsyncThunk<string[], string[]>(
	'usersApp/userClassifications',
	async (userClassificationsIds) => {
		await axios.delete('/api/user-classifications', { data: userClassificationsIds });

		return userClassificationsIds;
	}
);

const userClassificationsAdapter = createEntityAdapter<UserClassificationType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.usersApp?.userClassifications?.searchText;

export const { selectAll: selectUserClassifications, selectById: selectUsersById } =
	userClassificationsAdapter.getSelectors((state: AppRootStateType) => state.usersApp?.userClassifications);

export const selectFilteredUserClassifications = createSelector(
	[selectUserClassifications, selectSearchText],
	(classifications: UserClassificationsType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return classifications;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(classifications, searchText);
	}
);

type GroupedUsersType = {
	group: string;
	children?: UserClassificationType[];
};

type AccumulatorType = {
	[key: string]: GroupedUsersType;
};

/**
 * Select grouped user types
 */
export const selectGroupedFilteredUserClassifications = createSelector([selectFilteredUserClassifications], (types) => {
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

const initialState = userClassificationsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Users App Users slice.
 */
export const userClassificationsSlice = createSlice({
	name: 'usersApp/userClassifications',
	initialState,
	reducers: {
		setUserClassificationsSearchText: {
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
			.addCase(updateUserClassification.fulfilled, (state, action) =>
				userClassificationsAdapter.upsertOne(state, action.payload)
			)
			.addCase(addUserClassification.fulfilled, (state, action) =>
				userClassificationsAdapter.addOne(state, action.payload)
			)
			.addCase(removeUserClassification.fulfilled, (state, action) =>
				userClassificationsAdapter.removeOne(state, action.payload)
			)
			.addCase(getUserClassifications.fulfilled, (state, action) => {
				userClassificationsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setUserClassificationsSearchText } = userClassificationsSlice.actions;

export type userClassificationsSliceType = typeof userClassificationsSlice;

export default userClassificationsSlice.reducer;
