import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	[key: string]: unknown;
};

export const getWidgets = createAppAsyncThunk('trackingAlertDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get('/api/widgets/tracking-alert');

	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = {};

/**
 * The trackingAlert dashboard widgets slice.
 */
export const widgetsSlice = createSlice({
	name: 'trackingAlertDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.trackingAlertDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice.reducer;
