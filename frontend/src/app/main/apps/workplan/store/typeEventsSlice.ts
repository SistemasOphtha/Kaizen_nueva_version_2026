import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import FuseUtils from '@fuse/utils';
import { addTypeEvent, removeTypeEvent, updateTypeEvent } from './typeEventSlice';
import { TypeEventType, TypeEventsType } from '../types/TypeEventType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getTypeEvents = createAppAsyncThunk<TypeEventsType>('workplansApp/typeEvents/getTypeEvents', async () => {
	const response = await axios.get('/api/type-events');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as TypeEventsType;

	return data;
});

/**
 * Remove third regions
 */
export const removeTypeEvents = createAppAsyncThunk<string[], string[]>(
	'workplansApp/typeEvents',
	async (typeEventsIds) => {
		await axios.delete('/api/type-events', { data: typeEventsIds });

		return typeEventsIds;
	}
);

const typeEventsAdapter = createEntityAdapter<TypeEventType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
export const selectSearchText = (state: AppRootStateType) => state.workplansApp?.typeEvents?.searchText;

export const { selectAll: selectTypeEvents, selectById: selectThirdsById } = typeEventsAdapter.getSelectors(
	(state: AppRootStateType) => state.workplansApp?.typeEvents
);

export const selectFilteredTypeEvents = createSelector(
	[selectTypeEvents, selectSearchText],
	(regions: TypeEventsType, searchText) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (searchText.length === 0) {
			return regions;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return FuseUtils.filterArrayByString(regions, searchText);
	}
);

type GroupedThirdsType = {
	group: string;
	children?: TypeEventType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped third types
 */
export const selectGroupedFilteredTypeEvents = createSelector([selectFilteredTypeEvents], (types) => {
	const groupedObject = types
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

const initialState = typeEventsAdapter.getInitialState({
	searchText: ''
});

/**
 * The Thirds App Thirds slice.
 */
export const typeEventsSlice = createSlice({
	name: 'workplansApp/typeEvents',
	initialState,
	reducers: {
		setTypeEventsSearchText: {
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
			.addCase(updateTypeEvent.fulfilled, (state, action) => typeEventsAdapter.upsertOne(state, action.payload))
			.addCase(addTypeEvent.fulfilled, (state, action) => typeEventsAdapter.addOne(state, action.payload))
			.addCase(removeTypeEvent.fulfilled, (state, action) => typeEventsAdapter.removeOne(state, action.payload))
			.addCase(getTypeEvents.fulfilled, (state, action) => {
				typeEventsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { setTypeEventsSearchText } = typeEventsSlice.actions;

export type typeEventsSliceType = typeof typeEventsSlice;

export default typeEventsSlice.reducer;
