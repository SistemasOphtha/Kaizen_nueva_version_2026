import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdSubSpecialtyType } from '../types/ThirdSubSpecialtyType';
import ThirdSubSpecialtyModel from '../models/ThirdSubSpecialtyModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdSubSpecialty = createAppAsyncThunk<ThirdSubSpecialtyType, string>(
	'thirdsApp/thirdSubSpecialtys/getThirdSubSpecialty',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/third-sub-specialtys/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdSubSpecialtyType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/third-subSpecialtys` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeThirdSubSpecialty = createAppAsyncThunk<string, string>(
	'thirdsApp/thirdSubSpecialtys/removeThirdSubSpecialty',
	async (id) => {
		const response = await axios.delete(`/api/third-sub-specialtys/${id}`);

		await response.data;

		return id;
	}
);

export const addThirdSubSpecialty = createAppAsyncThunk<ThirdSubSpecialtyType, ThirdSubSpecialtyType>(
	'thirdSubSpecialtys/addThirdSubSpecialty',
	async (thirdSubSpecialty: ThirdSubSpecialtyType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/third-sub-specialtys', thirdSubSpecialty);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdSubSpecialtyType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThirdSubSpecialty = createAppAsyncThunk<ThirdSubSpecialtyType, DeepPartial<ThirdSubSpecialtyType>>(
	'thirdsApp/thirdSubSpecialtys/updateThirdSubSpecialty',
	async (thirdSubSpecialty) => {
		const response = await axios.put(`/api/third-sub-specialtys/${thirdSubSpecialty.id}`, thirdSubSpecialty);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdSubSpecialtyType;

		return data;
	}
);

const initialState: AsyncStateType<ThirdSubSpecialtyType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdSubSpecialtySlice = createSlice({
	name: 'thirdsApp/thirdSubSpecialty',
	initialState,
	reducers: {
		newThirdSubSpecialty: (state) => {
			state.data = ThirdSubSpecialtyModel({});
		},
		resetThirdSubSpecialty: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThirdSubSpecialty.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThirdSubSpecialty.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThirdSubSpecialty.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThirdSubSpecialty.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectThirdSubSpecialty = (state: AppRootStateType) => state.thirdsApp.thirdSubSpecialty;

export const { resetThirdSubSpecialty, newThirdSubSpecialty } = thirdSubSpecialtySlice.actions;

export type thirdSubSpecialtySliceType = typeof thirdSubSpecialtySlice;

export default thirdSubSpecialtySlice.reducer;
