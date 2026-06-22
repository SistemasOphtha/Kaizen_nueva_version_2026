import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { UserRegionType } from '../types/UserRegionType';
import UserRegionModel from '../models/UserRegionModel';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUserRegion = createAppAsyncThunk<UserRegionType, string>(
	'usersApp/userRegions/getUserRegion',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/user-regions/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as UserRegionType;

			return data;
		} catch (error) {
			history.push({ pathname: `/apps/user-regions` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove user
 */
export const removeUserRegion = createAppAsyncThunk<string, string>(
	'usersApp/userRegions/removeUserRegion',
	async (id) => {
		const response = await axios.delete(`/api/user-regions/${id}`);

		await response.data;

		return id;
	}
);

export const addUserRegion = createAppAsyncThunk<UserRegionType, UserRegionType>(
	'userRegions/addUserRegion',
	async (userRegion: UserRegionType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/user-regions', userRegion);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as UserRegionType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update user
 */
export const updateUserRegion = createAppAsyncThunk<UserRegionType, DeepPartial<UserRegionType>>(
	'usersApp/userRegions/updateUserRegion',
	async (userRegion) => {
		const response = await axios.put(`/api/user-regions/${userRegion.id}`, userRegion);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as UserRegionType;

		return data;
	}
);

const initialState: AsyncStateType<UserRegionType> = {
	data: null,
	status: 'idle'
};

/**
 * The users App User slice.
 */
export const userRegionSlice = createSlice({
	name: 'usersApp/userRegion',
	initialState,
	reducers: {
		newUserRegion: (state) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			state.data = UserRegionModel({});
		},
		resetUserRegion: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserRegion.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserRegion.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateUserRegion.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeUserRegion.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectUserRegion = (state: AppRootStateType) => state.usersApp.userRegion;

export const { resetUserRegion, newUserRegion } = userRegionSlice.actions;

export type userRegionSliceType = typeof userRegionSlice;

export default userRegionSlice.reducer;
