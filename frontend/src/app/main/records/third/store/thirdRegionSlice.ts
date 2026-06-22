import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdRegionType } from '../types/ThirdRegionType';
import ThirdRegionModel from '../models/ThirdRegionModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdRegion = createAppAsyncThunk<ThirdRegionType, string>(
	'thirdsApp/thirdRegions/getThirdRegion',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/third-regions/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdRegionType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/third-regions` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeThirdRegion = createAppAsyncThunk<string, string>(
	'thirdsApp/thirdRegions/removeThirdRegion',
	async (id) => {
		const response = await axios.delete(`/api/third-regions/${id}`);

		await response.data;

		return id;
	}
);

export const addThirdRegion = createAppAsyncThunk<ThirdRegionType, ThirdRegionType>(
	'thirdRegions/addThirdRegion',
	async (thirdRegion: ThirdRegionType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/third-regions', thirdRegion);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdRegionType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThirdRegion = createAppAsyncThunk<ThirdRegionType, DeepPartial<ThirdRegionType>>(
	'thirdsApp/thirdRegions/updateThirdRegion',
	async (thirdRegion) => {
		const response = await axios.put(`/api/third-regions/${thirdRegion.id}`, thirdRegion);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdRegionType;

		return data;
	}
);

const initialState: AsyncStateType<ThirdRegionType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdRegionSlice = createSlice({
	name: 'thirdsApp/thirdRegion',
	initialState,
	reducers: {
		newThirdRegion: (state) => {
			state.data = ThirdRegionModel({});
		},
		resetThirdRegion: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThirdRegion.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThirdRegion.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThirdRegion.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThirdRegion.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectThirdRegion = (state: AppRootStateType) => state.thirdsApp.thirdRegion;

export const { resetThirdRegion, newThirdRegion } = thirdRegionSlice.actions;

export type thirdRegionSliceType = typeof thirdRegionSlice;

export default thirdRegionSlice.reducer;
