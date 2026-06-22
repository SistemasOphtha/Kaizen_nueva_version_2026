/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { AppDispatchType, RootStateType } from 'app/store/types';
import { UserType, UpdatePasswordType } from 'app/store/user';
import { PartialDeep } from 'type-fest';
import { AxiosError } from 'axios/index';
import jwtService from '../../auth/services/jwtService';
import createAppAsyncThunk from '../createAppAsyncThunk';

type AppRootStateType = RootStateType<userSliceType>;

/**
 * Sets the user data in the Redux store and updates the login redirect URL if provided.
 */
export const setUser = createAsyncThunk('user/setUser', (user: UserType) => {
	/*
    You can redirect the logged-in user to a specific route depending on his role
    */
	if (user.loginRedirectUrl) {
		settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
	}

	const normalizedUser = { ...user };
	if (normalizedUser.role) {
		if (typeof normalizedUser.role === 'string') {
			normalizedUser.role = [normalizedUser.role];
		} else if (!Array.isArray(normalizedUser.role)) {
			normalizedUser.role = [];
		}
	} else {
		normalizedUser.role = [];
	}

	return Promise.resolve(normalizedUser);
});

/**
 * Updates the user's settings in the Redux store and returns the updated user object.
 */
export const updateUserSettings = createAppAsyncThunk(
	'user/updateSettings',
	async (settings: FuseSettingsConfigType, { dispatch, rejectWithValue, getState }) => {
		const AppState = getState() as AppRootStateType;
		const { user } = AppState;

		const isUserGuest = selectIsUserGuest(AppState);

		if (isUserGuest) {
			return null;
		}

		const userRequestData = { data: { ...user.data, settings } } as UserType;

		try {
			const response = await jwtService.updateUserData(userRequestData);

			dispatch(showMessage({ message: 'User settings saved with api' }));

			return response.data as UserType;
		} catch (error) {
			const axiosError = error as AxiosError;

			dispatch(showMessage({ message: axiosError.message }));

			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Updates the user's shortcuts in the Redux store and returns the updated user object.
 */
export const updateUserShortcuts = createAppAsyncThunk(
	'user/updateShortucts',
	async (shortcuts: string[], { dispatch, getState, rejectWithValue }) => {
		const AppState = getState() as AppRootStateType;
		const { user } = AppState;

		const isUserGuest = selectIsUserGuest(AppState);

		if (isUserGuest) {
			return null;
		}

		const userRequestData = { data: { ...user.data, shortcuts } } as PartialDeep<UserType>;

		try {
			const response = await jwtService.updateUserData(userRequestData);

			dispatch(showMessage({ message: 'User shortcuts saved with api' }));

			return response.data as UserType;
		} catch (error) {
			const axiosError = error as AxiosError;

			dispatch(showMessage({ message: axiosError.message }));

			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Logs the user out and resets the Redux store.
 */
export const logoutUser = () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
	const AppState = getState() as AppRootStateType;

	const isUserGuest = selectIsUserGuest(AppState);

	if (isUserGuest) {
		return null;
	}

	history.push({
		pathname: '/'
	});

	dispatch(setInitialSettings());

	return Promise.resolve(dispatch(userLoggedOut()));
};

/**
 * Updates the user's data in the Redux store and returns the updated user object.
 */
export const updateUserData = createAppAsyncThunk<UserType, PartialDeep<UserType>>(
	'user/update',
	async (userRequestData, { dispatch, rejectWithValue, getState }) => {
		const AppState = getState() as AppRootStateType;

		const isUserGuest = selectIsUserGuest(AppState);

		if (isUserGuest) {
			return null;
		}

		try {
			const response = await jwtService.updateUserData(userRequestData);

			dispatch(showMessage({ message: 'User data saved with api' }));

			return response.data as UserType;
		} catch (error) {
			const axiosError = error as AxiosError;

			dispatch(showMessage({ message: axiosError.message }));

			return rejectWithValue(axiosError.message);
		}
	}
);

export const updateUserPassword = createAsyncThunk<UserType, UpdatePasswordType>(
	'user/updatePassword',
	async (passwordRequestData, { dispatch, rejectWithValue }) => {
		try {
			const response = await jwtService.updateUserPassword(passwordRequestData);
			dispatch(showMessage({ message: 'Password updated successfully' }));
			return response.data as UserType;
		} catch (error) {
			const axiosError = error as AxiosError;
			dispatch(showMessage({ message: axiosError.message }));
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * The initial state of the user slice.
 */
const initialState: UserType = {
	id: 0,
	role: [], // guest
	data: {
		displayName: '',
		photoURL: '',
		email: '',
		shortcuts: []
	}
};

/**
 * The User slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLoggedOut: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(setUser.fulfilled, (state, action) => {
				const user = action.payload;
				if (user && user.role) {
					if (typeof user.role === 'string') {
						user.role = [user.role];
					} else if (!Array.isArray(user.role)) {
						user.role = [];
					}
				} else if (user) {
					user.role = [];
				}
				return user;
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				const user = action.payload;
				if (user && user.role) {
					if (typeof user.role === 'string') {
						user.role = [user.role];
					} else if (!Array.isArray(user.role)) {
						user.role = [];
					}
				} else if (user) {
					user.role = [];
				}
				return user;
			})
			.addCase(updateUserShortcuts.fulfilled, (state, action) => {
				const payload = action.payload as UserType | { shortcuts?: string[] };
				if (payload && 'shortcuts' in payload) {
					state.data.shortcuts = payload.shortcuts;
				} else if (payload && 'data' in payload && payload.data?.shortcuts) {
					state.data.shortcuts = payload.data.shortcuts;
				}
			})
			.addCase(updateUserSettings.fulfilled, (state, action) => {
				const payload = action.payload as UserType | { settings?: Partial<FuseSettingsConfigType> };
				if (payload && 'settings' in payload) {
					state.data.settings = payload.settings;
				} else if (payload && 'data' in payload && payload.data?.settings) {
					state.data.settings = payload.data.settings;
				}
			});
	}
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = (state: AppRootStateType) => state.user;

export const selectUserRole = (state: AppRootStateType) => state.user.role;

export const selectIsUserGuest = (state: AppRootStateType) => {
	const { role } = state.user;

	return !role || role.length === 0;
};

export const selectUserShortcuts = (state: AppRootStateType) => state.user.data.shortcuts;

export type userSliceType = typeof userSlice;

export default userSlice.reducer;
