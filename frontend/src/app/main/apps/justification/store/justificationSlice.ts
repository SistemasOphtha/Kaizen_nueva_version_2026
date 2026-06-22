import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { JustificationType } from '../types/JustificationType';
import JustificationModel from '../models/JustificationModel';
import { AppRootStateType } from '.';

/**
 * Get justifications from server
 */
export const getJustification = createAppAsyncThunk<JustificationType, string>(
	'justificationsApp/justification/getJustification',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/justifications/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as JustificationType;

			return data;
		} catch (error) {
			history.push({ pathname: `/apps/justifications` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addJustification = createAppAsyncThunk<JustificationType, JustificationType>(
	'justifications/add',
	async (justification: JustificationType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/justifications', justification);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as JustificationType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response);
		}
	}
);

/**
 * Update justification
 */
export const updateJustification = createAppAsyncThunk<JustificationType, DeepPartial<JustificationType>>(
	'justificationsApp/justifications/updateJustification',
	async (justification) => {
		const response = await axios.put(`/api/justifications/${justification.id}`, justification);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as JustificationType;

		return data;
	}
);

/**
 * Remove justification
 */
export const removeJustification = createAppAsyncThunk<string, string>(
	'justificationsApp/justifications/removeJustification',
	async (id) => {
		const response = await axios.delete(`/api/justifications/${id}`);

		await response.data;

		return id;
	}
);

const initialState: AsyncStateType<JustificationType> = {
	data: null,
	status: 'idle'
};

/**
 * The justifications App Justification slice.
 */
export const justificationSlice = createSlice({
	name: 'justificationsApp/justification',
	initialState,
	reducers: {
		newJustification: (state) => {
			state.data = JustificationModel({});
		},
		resetJustification: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getJustification.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getJustification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateJustification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeJustification.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectJustification = (state: AppRootStateType) => state.justificationsApp.justification;

export const { resetJustification, newJustification } = justificationSlice.actions;

export type justificationSliceType = typeof justificationSlice;

export default justificationSlice.reducer;
