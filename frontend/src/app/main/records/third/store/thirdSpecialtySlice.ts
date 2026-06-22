import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdSpecialtyType } from '../types/ThirdSpecialtyType';
import ThirdSpecialtyModel from '../models/ThirdSpecialtyModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirdSpecialty = createAppAsyncThunk<ThirdSpecialtyType, string>(
	'thirdsApp/thirdSpecialtys/getThirdSpecialty',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/third-specialtys/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdSpecialtyType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/third-specialtys` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeThirdSpecialty = createAppAsyncThunk<string, string>(
	'thirdsApp/thirdSpecialtys/removeThirdSpecialty',
	async (id) => {
		const response = await axios.delete(`/api/third-specialtys/${id}`);

		await response.data;

		return id;
	}
);

export const addThirdSpecialty = createAppAsyncThunk<ThirdSpecialtyType, ThirdSpecialtyType>(
	'thirdSpecialtys/addThirdSpecialty',
	async (thirdSpecialty: ThirdSpecialtyType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/third-specialtys', thirdSpecialty);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdSpecialtyType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThirdSpecialty = createAppAsyncThunk<ThirdSpecialtyType, DeepPartial<ThirdSpecialtyType>>(
	'thirdsApp/thirdSpecialtys/updateThirdSpecialty',
	async (thirdSpecialty) => {
		const response = await axios.put(`/api/third-specialtys/${thirdSpecialty.id}`, thirdSpecialty);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as ThirdSpecialtyType;

		return data;
	}
);

const initialState: AsyncStateType<ThirdSpecialtyType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdSpecialtySlice = createSlice({
	name: 'thirdsApp/thirdSpecialty',
	initialState,
	reducers: {
		newThirdSpecialty: (state) => {
			state.data = ThirdSpecialtyModel({});
		},
		resetThirdSpecialty: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThirdSpecialty.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThirdSpecialty.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThirdSpecialty.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThirdSpecialty.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectThirdSpecialty = (state: AppRootStateType) => state.thirdsApp.thirdSpecialty;

export const { resetThirdSpecialty, newThirdSpecialty } = thirdSpecialtySlice.actions;

export type thirdSpecialtySliceType = typeof thirdSpecialtySlice;

export default thirdSpecialtySlice.reducer;
