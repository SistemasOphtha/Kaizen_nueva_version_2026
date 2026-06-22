import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdClassificationType } from '../types/ThirdClassificationType';
import ThirdClassificationModel from '../models/ThirdClassificationModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdClassification = createAppAsyncThunk<ThirdClassificationType, string>(
	'thirdsApp/thirdClassifications/getThirdClassification',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/third-classifications/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdClassificationType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/third-classifications` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeThirdClassification = createAppAsyncThunk<string, string>(
	'thirdsApp/thirdClassifications/removeThirdClassification',
	async (id) => {
		const response = await axios.delete(`/api/third-classifications/${id}`);

		await response.data;

		return id;
	}
);

export const addThirdClassification = createAppAsyncThunk<ThirdClassificationType, ThirdClassificationType>(
	'thirdClassifications/addThirdClassification',
	async (thirdClassification: ThirdClassificationType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/third-classifications', thirdClassification);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdClassificationType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThirdClassification = createAppAsyncThunk<
	ThirdClassificationType,
	DeepPartial<ThirdClassificationType>
>('thirdsApp/thirdClassifications/updateThirdClassification', async (thirdClassification) => {
	const response = await axios.put(`/api/third-classifications/${thirdClassification.id}`, thirdClassification);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as ThirdClassificationType;

	return data;
});

const initialState: AsyncStateType<ThirdClassificationType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdClassificationSlice = createSlice({
	name: 'thirdsApp/thirdClassification',
	initialState,
	reducers: {
		newThirdClassification: (state) => {
			state.data = ThirdClassificationModel({});
		},
		resetThirdClassification: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThirdClassification.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThirdClassification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThirdClassification.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThirdClassification.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectThirdClassification = (state: AppRootStateType) => state.thirdsApp.thirdClassification;

export const { resetThirdClassification, newThirdClassification } = thirdClassificationSlice.actions;

export type thirdClassificationSliceType = typeof thirdClassificationSlice;

export default thirdClassificationSlice.reducer;
