import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { UserClassificationType } from '../types/UserClassificationType';
import UserClassificationModel from '../models/UserClassificationModel';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUserClassification = createAppAsyncThunk<UserClassificationType, string>(
	'usersApp/userClassifications/getUserClassification',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/user-classifications/${id}`);

			const data = (await response.data) as UserClassificationType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/user-classifications` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove user
 */
export const removeUserClassification = createAppAsyncThunk<string, string>(
	'usersApp/userClassifications/removeUserClassification',
	async (id) => {
		const response = await axios.delete(`/api/user-classifications/${id}`);

		await response.data;

		return id;
	}
);

export const addUserClassification = createAppAsyncThunk<UserClassificationType, UserClassificationType>(
	'userClassifications/addUserClassification',
	async (userClassification: UserClassificationType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/user-classifications', userClassification);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as UserClassificationType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update user
 */
export const updateUserClassification = createAppAsyncThunk<
	UserClassificationType,
	DeepPartial<UserClassificationType>
>('usersApp/userClassifications/updateUserClassification', async (userClassification) => {
	const response = await axios.put(`/api/user-classifications/${userClassification.id}`, userClassification);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as UserClassificationType;

	return data;
});

const initialState: AsyncStateType<UserClassificationType> = {
	data: null,
	status: 'idle'
};

/**
 * The users App User slice.
 */
export const userClassificationSlice = createSlice({
	name: 'usersApp/userClassification',
	initialState,
	reducers: {
		newUserClassification: (state) => {
			state.data = UserClassificationModel({});
		},
		resetUserClassification: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserClassification.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserClassification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateUserClassification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeUserClassification.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectUserClassification = (state: AppRootStateType) => state.usersApp.userClassification;

export const { resetUserClassification, newUserClassification } = userClassificationSlice.actions;

export type userClassificationSliceType = typeof userClassificationSlice;

export default userClassificationSlice.reducer;
