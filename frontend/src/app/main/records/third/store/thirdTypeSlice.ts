import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdTypeType } from '../types/ThirdTypeType';
import ThirdTypeModel from '../models/ThirdTypeModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdType = createAppAsyncThunk<ThirdTypeType, string>(
	'thirdsApp/thirdTypes/getThirdType',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/third-types/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdTypeType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/third-types` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeThirdType = createAppAsyncThunk<string, string>('thirdsApp/thirdTypes/removeType', async (id) => {
	const response = await axios.delete(`/api/third-types/${id}`);

	await response.data;

	return id;
});

export const addThirdType = createAppAsyncThunk<ThirdTypeType, ThirdTypeType>(
	'thirdTypes/addThirdType',
	async (thirdType: ThirdTypeType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/third-types', thirdType);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdTypeType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThirdType = createAppAsyncThunk<ThirdTypeType, DeepPartial<ThirdTypeType>>(
	'thirdsApp/thirdTypes/updateThirdType',
	async (thirdType) => {
		const response = await axios.put(`/api/third-types/${thirdType.id}`, thirdType);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdTypeType;

		return data;
	}
);

const initialState: AsyncStateType<ThirdTypeType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdTypeSlice = createSlice({
	name: 'thirdsApp/thirdType',
	initialState,
	reducers: {
		newThirdType: (state) => {
			state.data = ThirdTypeModel({});
		},
		resetThirdType: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThirdType.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThirdType.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThirdType.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThirdType.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectThirdType = (state: AppRootStateType) => state.thirdsApp.thirdType;

export const { resetThirdType, newThirdType } = thirdTypeSlice.actions;

export type thirdTypeSliceType = typeof thirdTypeSlice;

export default thirdTypeSlice.reducer;
