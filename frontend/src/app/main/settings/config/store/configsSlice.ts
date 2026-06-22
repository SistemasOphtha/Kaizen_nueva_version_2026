import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addConfig, removeConfig, updateConfig } from './configSlice';
import { ConfigType, ConfigsType } from '../types/ConfigType';
import { AppRootStateType } from '.';

/**
 * Get configs from server
 */
export const getConfigs = createAppAsyncThunk<ConfigsType>('configsApp/configs/getConfigs', async () => {
	const response = await axios.get('/api/configs');
	const data = (await response.data) as ConfigsType;

	return data;
});

const configsAdapter = createEntityAdapter<ConfigType>();

export const selectSearchText = (state: AppRootStateType) => state.configsApp?.configs?.searchText;
export const {
	selectAll: selectConfigs,
	selectIds: selectConfigIds,
	selectById: selectConfigById
} = configsAdapter.getSelectors((state: AppRootStateType) => state.configsApp?.configs);

export const selectFilteredConfigs = createSelector([selectConfigs, selectSearchText], (configs, searchText) => {
	if (searchText.length === 0) {
		return configs;
	}
	return FuseUtils.filterArrayByString(configs, searchText);
});

type GroupedConfigsType = {
	group: string;
	children?: ConfigType[];
};

type AccumulatorType = {
	[key: string]: GroupedConfigsType;
};

/**
 * Select grouped thirds
 */
export const selectGroupedFilteredConfigs = createSelector([selectFilteredConfigs], (configs: ConfigsType) => {
	const groupedObject = configs
		.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
		.reduce<AccumulatorType>((r, e) => {
			// get first letter of name of current element
			const group = e.name[0];

			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, children: [e] };
			// if there is push current element to children array for that letter
			else {
				r[group]?.children?.push(e);
			}

			// return accumulator
			return r;
		}, {});

	return groupedObject;
});

const initialState = configsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Users App Users slice.
 */
export const configsSlice = createSlice({
	name: 'configsApp/configs',
	initialState,
	reducers: {
		setConfigsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateConfig.fulfilled, (state, action) => configsAdapter.upsertOne(state, action.payload))
			.addCase(addConfig.fulfilled, (state, action) => configsAdapter.addOne(state, action.payload))
			.addCase(removeConfig.fulfilled, (state, action) => configsAdapter.removeOne(state, action.payload))
			.addCase(getConfigs.fulfilled, (state, action) => {
				configsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setConfigsSearchText } = configsSlice.actions;

export type configsSliceType = typeof configsSlice;

export default configsSlice.reducer;
