import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { VisitType } from '../types/VisitType';
import VisitModel from '../models/VisitModel';
import { AppRootStateType } from '.';

/**
 * Get visits from server
 */
export const getVisit = createAppAsyncThunk<VisitType, string>(
	'visitsApp/visit/getVisit',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/visits/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as VisitType;

			return data;
		} catch (error) {
			history.push({ pathname: `/apps/visits` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addVisit = createAppAsyncThunk<VisitType, VisitType>(
	'visits/add',
	async (visit: VisitType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/visits', visit);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as VisitType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response);
		}
	}
);

/**
 * Update visit
 */
export const updateVisit = createAppAsyncThunk<VisitType, DeepPartial<VisitType>>(
	'visitsApp/visits/updateVisit',
	async (visit) => {
		const response = await axios.put(`/api/visits/${visit.id}`, visit);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as VisitType;

		return data;
	}
);

/**
 * Remove visit
 */
export const removeVisit = createAppAsyncThunk<string, string>('visitsApp/visits/removeVisit', async (id) => {
	const response = await axios.delete(`/api/visits/${id}`);

	await response.data;

	return id;
});

const initialState: AsyncStateType<VisitType> = {
	data: null,
	status: 'idle'
};

/**
 * The visits App Visit slice.
 */
export const visitSlice = createSlice({
	name: 'visitsApp/visit',
	initialState,
	reducers: {
		newVisit: (state) => {
			state.data = VisitModel({});
		},
		resetVisit: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getVisit.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getVisit.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateVisit.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeVisit.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectVisit = (state: AppRootStateType) => state.visitsApp.visit;

export const { resetVisit, newVisit } = visitSlice.actions;

export type visitSliceType = typeof visitSlice;

export default visitSlice.reducer;
