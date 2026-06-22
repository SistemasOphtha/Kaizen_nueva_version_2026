import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { WorkplanType } from '../types/WorkplanType';
import WorkplanModel from '../models/WorkplanModel';
import { AppRootStateType } from '.';

/**
 * Get workplans from server
 */
export const getWorkplan = createAppAsyncThunk<WorkplanType, string>(
	'workplansApp/workplan/getWorkplan',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/workplans/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as WorkplanType;

			return data;
		} catch (error) {
			history.push({ pathname: `/dashboards/workplans` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addWorkplan = createAppAsyncThunk<WorkplanType, WorkplanType>(
	'workplans/add',
	async (workplan: WorkplanType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/workplans', workplan);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as WorkplanType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update workplan
 */
export const updateWorkplan = createAppAsyncThunk<WorkplanType, DeepPartial<WorkplanType>>(
	'workplansApp/workplans/updateWorkplan',
	async (workplan) => {
		const response = await axios.put(`/api/workplans/${workplan.id}`, workplan);
		const data = (await response.data) as WorkplanType;
		return data;
	}
);

/**
 * Remove workplan
 */
export const removeWorkplan = createAppAsyncThunk<string, string>(
	'workplansApp/workplans/removeWorkplan',
	async (id) => {
		const response = await axios.delete(`/api/workplans/${id}`);
		await response.data;
		return id;
	}
);

const initialState: AsyncStateType<WorkplanType> = {
	data: null,
	status: 'idle'
};

/**
 * The workplans App Workplan slice.
 */
export const workplanSlice = createSlice({
	name: 'workplansApp/workplan',
	initialState,
	reducers: {
		newWorkplan: (state) => {
			state.data = WorkplanModel({});
		},
		resetWorkplan: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWorkplan.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getWorkplan.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateWorkplan.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeWorkplan.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectWorkplan = (state: AppRootStateType) => state.workplansApp.workplan;

export const { resetWorkplan, newWorkplan } = workplanSlice.actions;

export type workplanSliceType = typeof workplanSlice;

export default workplanSlice.reducer;
