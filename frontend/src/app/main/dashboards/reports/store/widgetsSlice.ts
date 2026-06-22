import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootStateType } from 'app/store/types';
import { Buffer } from 'buffer';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	[key: string]: unknown;
};

type FilterJSONType = {
	type: number;
	identification: string;
	name: string;
	region: number;
	status: string;
	userId: number;
};

export const getWidgets = createAppAsyncThunk(
	'reportsDashboardApp/widgets/getWidgets',
	async (json: FilterJSONType, { rejectWithValue }) => {
		try {
			const filterBase64 = Buffer.from(JSON.stringify(json)).toString('base64');
			const response = await axios.get(`/api/widgets/reports?filter=${filterBase64}`);

			const data = (await response.data) as WidgetsType;

			return data;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const generateDataExport = createAppAsyncThunk(
	'reportsDashboardApp/widgets/generateDataExport',
	async (filter: string) => {
		const response = await axios.get(`/api/widgets/export/reports?filter=${filter}`);
		const data = (await response.data) as WidgetsType;

		return data;
	}
);

const initialState: WidgetsType = {};

/**
 * The reports dashboard widgets slice.
 */
export const widgetsSlice = createSlice({
	name: 'reportsDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
		// builder.addCase(generateDataExport.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.reportsDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice.reducer;
