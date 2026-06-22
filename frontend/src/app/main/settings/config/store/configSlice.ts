import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ConfigType } from '../types/ConfigType';
import ConfigModel from '../models/ConfigModel';
import { AppRootStateType } from '.';

/**
 * Get configs from server
 */

type AnyType = {
	[key: string]: unknown;
};

export const getConfig = createAppAsyncThunk<ConfigType, string>(
	'configsApp/configs/getConfig',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/configs/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ConfigType;

			return data;
		} catch (error) {
			history.push({ pathname: `/settings` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addConfig = createAppAsyncThunk<ConfigType, ConfigType>(
	'configs/add',
	async (workplan: ConfigType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/configs', workplan);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ConfigType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update configs
 */
export const updateConfig = createAppAsyncThunk<ConfigType, DeepPartial<ConfigType[]>>(
	'configsApp/configs/updateConfig',
	async (config) => {
		const response = await axios.put(`/api/configs`, config);
		const data = (await response.data) as ConfigType;
		return data;
	}
);

/**
 * Remove configs
 */
export const removeConfig = createAppAsyncThunk<string, string>('configsApp/configs/removeConfig', async (id) => {
	const response = await axios.delete(`/api/configs/${id}`);
	await response.data;
	return id;
});

const initialState: AsyncStateType<ConfigType> = {
	data: null,
	status: 'idle'
};

/**
 * The configs App Workplan slice.
 */
export const configSlice = createSlice({
	name: 'configsApp/config',
	initialState,
	reducers: {
		newConfig: (state) => {
			state.data = ConfigModel({});
		},
		resetConfig: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getConfig.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getConfig.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateConfig.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeConfig.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectConfig = (state: AppRootStateType) => state.configsApp.config;

export const { newConfig } = configSlice.actions;

export type configSliceType = typeof configSlice;

export default configSlice.reducer;
