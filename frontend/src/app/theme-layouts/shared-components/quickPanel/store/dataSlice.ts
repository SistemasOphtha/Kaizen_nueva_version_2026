import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { QuickModelType } from '../model/QuickModel';

type AppRootStateType = RootStateType<dataSliceType>;

/**
 * Gets the quick from the server.
 */
export const getQuicks = createAppAsyncThunk('quickPanel/getData', async () => {
	const response = await axios.get('/api/quicks');

	const data = (await response.data) as QuickModelType[];

	return data;
});

const quicksAdapter = createEntityAdapter<QuickModelType>();

const initialState = quicksAdapter.getInitialState();

export const { selectAll: selectQuicks, selectById: selectQuicksById } = quicksAdapter.getSelectors(
	(state: AppRootStateType) => state.quickPanel.data
);

/**
 * Quick Panel data slice.
 */
export const dataSlice = createSlice({
	name: 'quickPanel/data',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getQuicks.fulfilled, (state, action) =>
			quicksAdapter.addMany(quicksAdapter.getInitialState(), action.payload)
		);
	}
});

// export const selectQuickPanelData = (state: AppRootStateType) => state.quickPanel.data;

export type dataSliceType = typeof dataSlice;

export default dataSlice.reducer;
