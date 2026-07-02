import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateType } from 'app/store/types';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';

type AppRootStateType = RootStateType<widgetsSliceType>;

type WidgetsType = {
	[key: string]: unknown;
};

export const getWidgets = createAppAsyncThunk('pendingVisitsDashboardApp/widgets/getWidgets', async (params?: { userId?: number; regionId?: number; type?: number; identification?: string; name?: string; status?: string }) => {
	const response = await axios.get('/api/widgets/pending-visits', { params });

	const data = (await response.data) as WidgetsType;

	return data;
});

const initialState: WidgetsType = {};

/**
 * The pendingVisits dashboard widgets slice.
 */
export const widgetsSlice = createSlice({
	name: 'pendingVisitsDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.pendingVisitsDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice.reducer;
