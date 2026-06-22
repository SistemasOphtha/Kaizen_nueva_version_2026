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
	startDate: string;
	endDate: string;
	region: number;
	user: number;
};

export const getWidgets = createAppAsyncThunk(
	'impactsDashboardApp/widgets/getWidgets',
	async (json: FilterJSONType, { rejectWithValue }) => {
		try {
			const filterBase64 = Buffer.from(JSON.stringify(json)).toString('base64');
			const response = await axios.get(`/api/widgets/impacts?filter=${filterBase64}`);

			const data = (await response.data) as WidgetsType;

			return data;
		} catch (error) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.message);
		}
	}
);

export const getDataExportImpacts = createAppAsyncThunk(
	'impactsDashboardApp/widgets/getDataExportImpacts',
	async () => {
		const response = await axios.get('/api/widgets/export/impacts');

		const data = (await response.data) as WidgetsType;

		return data;
	}
);

const initialState: WidgetsType = {};

/**
 * The impacts dashboard widgets slice.
 */
export const widgetsSlice = createSlice({
	name: 'impactsDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
		builder.addCase(getDataExportImpacts.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.impactsDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice.reducer;
