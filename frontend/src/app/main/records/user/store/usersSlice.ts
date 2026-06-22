import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addUser, removeUser, updateUser } from './userSlice';
import { UserType, UsersType } from '../types/UserType';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUsers = createAppAsyncThunk<UsersType>('usersApp/users/getUsers', async () => {
	const response = await axios.get('/api/users');
	const data = (await response.data) as UsersType;

	return data;
});

type BulkDeleteResult = {
	deleted: number[];
	failed: { id: number; reason: string }[];
};

export const removeUsersBulk = createAppAsyncThunk<BulkDeleteResult, string[]>(
	'usersApp/users/removeUsersBulk',
	async (ids, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/users/bulk-delete', { ids });
			const data = (await response.data) as BulkDeleteResult;
			return data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response?.data ?? axiosError.message);
		}
	}
);

const usersAdapter = createEntityAdapter<UserType>({});

export const selectSearchText = (state: AppRootStateType) => state.usersApp?.users?.searchText;

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
	(state: AppRootStateType) => state.usersApp?.users || usersAdapter.getInitialState()
);

export const selectFilteredUsers = createSelector([selectUsers, selectSearchText], (users, searchText) => {
	if (searchText.length === 0) {
		return users;
	}
	return FuseUtils.filterArrayByString(users, searchText);
});

type GroupedUsersType = {
	group: string;
	children?: UserType[];
};

type AccumulatorType = {
	[key: string]: GroupedUsersType;
};

/**
 * Select grouped users
 */
export const selectGroupedFilteredUsers = createSelector([selectFilteredUsers], (users) => {
	const groupedObject = users
		.sort((a, b) => a.firstName.localeCompare(b.firstName, 'es', { sensitivity: 'base' }))
		.reduce<AccumulatorType>((r, e) => {
			// get first letter of name of current element
			const group = e.firstName[0];

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

const initialState = usersAdapter.getInitialState({
	searchText: ''
});

/**
 * The Users App Users slice.
 */
export const usersSlice = createSlice({
	name: 'usersApp/users',
	initialState,
	reducers: {
		setUsersSearchText: {
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
			.addCase(updateUser.fulfilled, (state, action) => usersAdapter.upsertOne(state, action.payload))
			.addCase(addUser.fulfilled, (state, action) => usersAdapter.addOne(state, action.payload))
			.addCase(removeUser.fulfilled, (state, action) => usersAdapter.removeOne(state, action.payload))
			.addCase(removeUsersBulk.fulfilled, (state, action) => {
				action.payload.deleted.forEach((id) => {
					usersAdapter.removeOne(state, id);
				});
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				usersAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setUsersSearchText } = usersSlice.actions;

export type usersSliceType = typeof usersSlice;

export default usersSlice.reducer;
