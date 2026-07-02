import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { ThirdType } from '../types/ThirdType';
import ThirdModel from '../models/ThirdModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThird = createAppAsyncThunk<ThirdType, string>(
	'thirdsApp/third/getThird',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/thirds/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as ThirdType;

			return data;
		} catch (error) {
			history.push({ pathname: `/records/thirds` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const addThird = createAppAsyncThunk<ThirdType, ThirdType>(
	'thirds/add',
	async (third: ThirdType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/thirds', third);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const importThird = createAppAsyncThunk<ThirdType, ThirdType>(
	'thirdsApp/thirds/importThird',
	async (third: ThirdType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/thirds/assign-or-create', third);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as ThirdType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateThird = createAppAsyncThunk<ThirdType, DeepPartial<ThirdType>>(
	'thirdsApp/thirds/updateThird',
	async (third) => {
		const response = await axios.put(`/api/thirds/${third.id}`, third);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
		const responseData = (await response.data) as any;
		
		// Handle both ThirdResponseDTO directly and SuccessResponseDTO
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (responseData.data ? responseData.data : responseData) as ThirdType;

		return data;
	}
);

/**
 * Remove third
 */
export const removeThird = createAppAsyncThunk<string, string>(
	'thirdsApp/thirds/removeThird',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/api/thirds/${id}`);
			await response.data;
			return id;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError);
		}
	}
);

interface CheckIdentificationNumber {
	thirdId: number;
	exist: boolean;
}

export const checkIdentificationNumber = createAppAsyncThunk<CheckIdentificationNumber, string>(
	'thirdsApp/third/checkIdentificationNumber',
	async (identificationNumber, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/thirds/check/${identificationNumber}`);
			const exists = (await response.data) as CheckIdentificationNumber;
			return exists;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const assignThird = createAppAsyncThunk<boolean, number>(
	'thirdsApp/third/assignThird',
	async (third: number, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/thirds/assign/${third}`);
			return response.data as boolean;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const unassignThird = createAppAsyncThunk<boolean, number>(
	'thirdsApp/third/unassignThird',
	async (third: number, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/thirds/unassign/${third}`);
			return response.data as boolean;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const assignThirdByAdmin = createAppAsyncThunk<boolean, { thirdId: number; userId: number }>(
	'thirdsApp/third/unassignThirdByAdmin',
	async ({ thirdId, userId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/thirds/assign/${thirdId}/${userId}`);
			return response.data as boolean;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const unassignThirdByAdmin = createAppAsyncThunk<boolean, { thirdId: number; userId: number }>(
	'thirdsApp/third/unassignThirdByAdmin',
	async ({ thirdId, userId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/api/thirds/unassign/${thirdId}/${userId}`);
			return response.data as boolean;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const unassignThirdsByAdminBulk = createAppAsyncThunk<
	{ removed: number[]; failed: { id: number; reason: string }[] },
	{ userId: number; thirdIds: number[] }
>('thirdsApp/third/unassignThirdsByAdminBulk', async ({ userId, thirdIds }, { rejectWithValue }) => {
	try {
		const response = await axios.post(`/api/thirds/unassign-bulk/${userId}`, {
			thirdIds
		});
		return response.data as { removed: number[]; failed: { id: number; reason: string }[] };
	} catch (error) {
		const axiosError = error as AxiosError;
		return rejectWithValue(axiosError.response?.data ?? axiosError.message);
	}
});

export const assignThirdsByAdminBulk = createAppAsyncThunk<
	{ assigned: number[]; failed: { id: number; reason: string }[] },
	{ userId: number; thirdIds: number[] }
>('thirdsApp/third/assignThirdsByAdminBulk', async ({ userId, thirdIds }, { rejectWithValue }) => {
	try {
		const response = await axios.post(`/api/thirds/assign-bulk/${userId}`, {
			thirdIds
		});
		return response.data as { assigned: number[]; failed: { id: number; reason: string }[] };
	} catch (error) {
		const axiosError = error as AxiosError;
		return rejectWithValue(axiosError.response?.data ?? axiosError.message);
	}
});

const initialState: AsyncStateType<ThirdType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const thirdSlice = createSlice({
	name: 'thirdsApp/third',
	initialState,
	reducers: {
		newThird: (state) => {
			state.data = ThirdModel({});
		},
		resetThird: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getThird.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getThird.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateThird.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeThird.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectThird = (state: AppRootStateType) => state.thirdsApp.third;

export const { resetThird, newThird } = thirdSlice.actions;

export type thirdSliceType = typeof thirdSlice;

export default thirdSlice.reducer;
