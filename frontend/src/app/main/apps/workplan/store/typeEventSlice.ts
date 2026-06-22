import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import history from '@history';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { DeepPartial } from 'react-hook-form';
import { AsyncStateType } from 'app/store/types';
import { TypeEventType } from '../types/TypeEventType';
import TypeEventModel from '../models/TypeEventModel';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getTypeEvent = createAppAsyncThunk<TypeEventType, string>(
	'workplansApp/typeEvents/getTypeEvent',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/type-events/${id}`);

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const data = (await response.data) as TypeEventType;

			return data;
		} catch (error) {
			history.push({ pathname: `/apps/type-events` });

			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Remove third
 */
export const removeTypeEvent = createAppAsyncThunk<string, string>(
	'workplansApp/typeEvents/removeTypeEvent',
	async (id) => {
		const response = await axios.delete(`/api/type-events/${id}`);

		await response.data;

		return id;
	}
);

export const addTypeEvent = createAppAsyncThunk<TypeEventType, TypeEventType>(
	'typeEvents/addTypeEvent',
	async (typeEvent: TypeEventType, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/type-events', typeEvent);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return response.data as TypeEventType;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

/**
 * Update third
 */
export const updateTypeEvent = createAppAsyncThunk<TypeEventType, DeepPartial<TypeEventType>>(
	'workplansApp/typeEvents/updateTypeEvent',
	async (typeEvent) => {
		const response = await axios.put(`/api/type-events/${typeEvent.id}`, typeEvent);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const data = (await response.data) as TypeEventType;

		return data;
	}
);

const initialState: AsyncStateType<TypeEventType> = {
	data: null,
	status: 'idle'
};

/**
 * The thirds App Third slice.
 */
export const typeEventSlice = createSlice({
	name: 'workplansApp/typeEvent',
	initialState,
	reducers: {
		newTypeEvent: (state) => {
			state.data = TypeEventModel({});
		},
		resetTypeEvent: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTypeEvent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getTypeEvent.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(updateTypeEvent.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'succeeded';
			})
			.addCase(removeTypeEvent.fulfilled, (state) => {
				state.data = null;
			});
	}
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectTypeEvent = (state: AppRootStateType) => state.workplansApp.typeEvent;

export const { resetTypeEvent, newTypeEvent } = typeEventSlice.actions;

export type typeEventSliceType = typeof typeEventSlice;

export default typeEventSlice.reducer;
