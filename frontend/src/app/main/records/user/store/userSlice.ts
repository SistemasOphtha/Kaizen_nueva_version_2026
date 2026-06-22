import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { UserType } from '../types/UserType';
import UserModel from '../models/UserModel';
import { AppRootStateType } from '.';

/**
 * Get users from server
 */
export const getUser = createAppAsyncThunk<UserType, string>(
	'usersApp/user/getUser',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/users/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as UserType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/users` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addUser = createAppAsyncThunk<UserType, UserType>(
	'users/add',
	async (user: UserType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/users', user);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as UserType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Approve panel for user
 */
export const approvePanel = createAppAsyncThunk<void, { userId: number; panelId: number }>(
	'usersApp/users/approvePanel',
	async ({ userId, panelId }) => {
		await axios.post(`/api/users/${userId}/third/${panelId}/approve`);
	}
);

export const desapprovePanel = createAppAsyncThunk<void, { userId: number; panelId: number }>(
	'usersApp/users/desapprovePanel',
	async ({ userId, panelId }) => {
		await axios.post(`/api/users/${userId}/third/${panelId}/desapprove`);
	}
);

export const approvePanelsBulk = createAppAsyncThunk<
	{ updated: number[]; failed: { id: number; reason: string }[] },
	{ userId: number; panelIds: number[] }
>(
	'usersApp/users/approvePanelsBulk',
	async ({ userId, panelIds }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/users/${userId}/thirds/approve-bulk`, {
				thirdIds: panelIds
			});
			return response.data as { updated: number[]; failed: { id: number; reason: string }[] };
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response?.data ?? axiosError.message);
		}
	}
);

export const desapprovePanelsBulk = createAppAsyncThunk<
	{ updated: number[]; failed: { id: number; reason: string }[] },
	{ userId: number; panelIds: number[] }
>(
	'usersApp/users/desapprovePanelsBulk',
	async ({ userId, panelIds }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/users/${userId}/thirds/desapprove-bulk`, {
				thirdIds: panelIds
			});
			return response.data as { updated: number[]; failed: { id: number; reason: string }[] };
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response?.data ?? axiosError.message);
		}
	}
);

/**
 * Update user
 */
export const updateUser = createAppAsyncThunk<UserType, DeepPartial<UserType>>(
	'usersApp/users/updateUser',
	async (user) => {
		const response = await axios.put(`/api/users/${user.id}`, user);
		const data = (await response.data) as UserType;

		return data;
	}
);

/**
 * Remove user
 */
export const removeUser = createAppAsyncThunk<string, string>('usersApp/users/removeUser', async (id) => {
	const response = await axios.delete(`/api/users/${id}`);

	await response.data;

	return id;
});

const initialState: AsyncStateType<UserType> = {
	data: null,
	status: 'idle'
};

/**
 * The users App User slice.
 */
export const userSlice = createSlice({
	name: 'usersApp/user',
	initialState,
	reducers: {
		newUser: (state) => {
			state.data = UserModel({});
		},
		resetUser: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeUser.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectUser = (state: AppRootStateType) => state.usersApp.user;

export const { resetUser, newUser } = userSlice.actions;

export type userSliceType = typeof userSlice;

export default userSlice.reducer;
