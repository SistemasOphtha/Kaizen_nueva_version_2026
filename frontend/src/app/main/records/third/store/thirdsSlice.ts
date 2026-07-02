import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import FuseUtils from '@fuse/utils';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { addThird, removeThird, updateThird } from './thirdSlice';
import { ThirdType, ThirdsType } from '../types/ThirdType';
import { AppRootStateType } from '.';

/**
 * Get thirds from server
 */
export const getThirds = createAppAsyncThunk<ThirdsType>('thirdsApp/thirds/getThirds', async () => {
	const response = await axios.get('/api/thirds');
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const data = (await response.data) as ThirdsType;

	return data;
});

type BulkDeleteResult = {
	deleted: number[];
	failed: { id: number; reason: string }[];
};

export const removeThirdsBulk = createAppAsyncThunk<BulkDeleteResult, string[]>(
	'thirdsApp/thirds/removeThirdsBulk',
	async (ids, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/thirds/bulk-delete', { ids });
			const data = (await response.data) as BulkDeleteResult;
			return data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			return rejectWithValue(axiosError.response?.data ?? axiosError.message);
		}
	}
);

const thirdsAdapter = createEntityAdapter<ThirdType>({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const selectSearchText = (state: AppRootStateType) => state.thirdsApp?.thirds?.searchText;
export const selectThirdsFilterType = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterType || 'all';
export const selectThirdsFilterStatus = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterStatus || 'all';
export const selectThirdsFilterAdvisor = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterAdvisor || 'all';
export const selectThirdsFilterRegion = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterRegion || 'all';
export const selectThirdsFilterSpecialty = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterSpecialty || 'all';
export const selectThirdsFilterClassification = (state: AppRootStateType) => state.thirdsApp?.thirds?.filterClassification || 'all';

export const { selectAll: selectThirds, selectById: selectThirdsById } = thirdsAdapter.getSelectors(
	(state: AppRootStateType) => state.thirdsApp?.thirds
);

export const selectFilteredThirds = createSelector(
	[
		selectThirds, 
		selectSearchText, 
		selectThirdsFilterType, 
		selectThirdsFilterStatus,
		selectThirdsFilterAdvisor,
		selectThirdsFilterRegion,
		selectThirdsFilterSpecialty,
		selectThirdsFilterClassification
	],
	(thirds, searchText, filterType, filterStatus, filterAdvisor, filterRegion, filterSpecialty, filterClassification) => {
		let filtered = thirds;

		if (filterType !== 'all') {
			filtered = filtered.filter((third) => third.third_type?.name === filterType);
		}

		if (filterStatus !== 'all') {
			filtered = filtered.filter((third) => third.status === filterStatus);
		}

		if (filterRegion !== 'all') {
			filtered = filtered.filter((third) => third.regionId === Number(filterRegion));
		}

		if (filterSpecialty !== 'all') {
			filtered = filtered.filter((third) => third.specialtyId === Number(filterSpecialty));
		}

		if (filterClassification !== 'all') {
			filtered = filtered.filter((third) => third.classificationId === Number(filterClassification));
		}

		if (filterAdvisor !== 'all') {
			filtered = filtered.filter((third) =>
				third.thirds_portfolios?.some(
					(p) => p.portfolio?.userId === Number(filterAdvisor) || p.portfolio?.user?.id === Number(filterAdvisor)
				)
			);
		}

		if (searchText.length === 0) {
			return filtered;
		}

		const searchWords = searchText.toLowerCase().split(/\s+/).filter(Boolean);
		if (searchWords.length === 0) {
			return filtered;
		}

		return filtered.filter((third) => {
			const name = (third.name || '').toLowerCase();
			const additionalName = (third.additionalName || '').toLowerCase();
			const identification = (third.identification || '').toLowerCase();
			const phone = (third.phone || '').toLowerCase();
			const mobile = (third.mobile || '').toLowerCase();
			const email = (third.email || '').toLowerCase();
			const city = (third.city || '').toLowerCase();
			const specialty = (third.third_specialty?.name || '').toLowerCase();
			const classification = (third.third_classification?.name || '').toLowerCase();
			const type = (third.third_type?.name || '').toLowerCase();
			const region = (third.region?.name || '').toLowerCase();
			const representative = third.thirds_portfolios?.map(p => `${p.portfolio?.user?.firstName || ''} ${p.portfolio?.user?.lastName || ''}`).join(' ').toLowerCase() || '';
			
			const fullText = `${name} ${additionalName} ${identification} ${phone} ${mobile} ${email} ${city} ${specialty} ${classification} ${type} ${region} ${representative}`;
			return searchWords.every((word) => fullText.includes(word));
		});
	}
);

type GroupedThirdsType = {
	group: string;
	children?: ThirdType[];
};

type AccumulatorType = {
	[key: string]: GroupedThirdsType;
};

/**
 * Select grouped thirds
 */
export const selectGroupedFilteredThirds = createSelector([selectFilteredThirds], (thirds) => {
	const groupedObject = thirds
		.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
		.sort((a, b) => a.city.localeCompare(b.city, 'es', { sensitivity: 'base' }))
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

const initialState = thirdsAdapter.getInitialState({
	searchText: '',
	filterType: 'all',
	filterStatus: 'all',
	filterAdvisor: 'all',
	filterRegion: 'all',
	filterSpecialty: 'all',
	filterClassification: 'all'
});

/**
 * The Thirds App Thirds slice.
 */
export const thirdsSlice = createSlice({
	name: 'thirdsApp/thirds',
	initialState,
	reducers: {
		setThirdsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: event.target.value || '',
				meta: undefined,
				error: null
			})
		},
		setThirdsFilterType: (state, action) => {
			state.filterType = action.payload as string;
		},
		setThirdsFilterStatus: (state, action) => {
			state.filterStatus = action.payload as string;
		},
		setThirdsFilterAdvisor: (state, action) => {
			state.filterAdvisor = action.payload as string;
		},
		setThirdsFilterRegion: (state, action) => {
			state.filterRegion = action.payload as string;
		},
		setThirdsFilterSpecialty: (state, action) => {
			state.filterSpecialty = action.payload as string;
		},
		setThirdsFilterClassification: (state, action) => {
			state.filterClassification = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateThird.fulfilled, (state, action) => thirdsAdapter.upsertOne(state, action.payload))
			.addCase(addThird.fulfilled, (state, action) => thirdsAdapter.addOne(state, action.payload))
			.addCase(removeThird.fulfilled, (state, action) => thirdsAdapter.removeOne(state, action.payload))
			.addCase(removeThirdsBulk.fulfilled, (state, action) => {
				action.payload.deleted.forEach((id) => {
					thirdsAdapter.removeOne(state, id);
				});
			})
			.addCase(getThirds.fulfilled, (state, action) => {
				thirdsAdapter.setAll(state, action.payload);
				state.searchText = '';
			});
	}
});

export const { 
	setThirdsSearchText, 
	setThirdsFilterType, 
	setThirdsFilterStatus,
	setThirdsFilterAdvisor,
	setThirdsFilterRegion,
	setThirdsFilterSpecialty,
	setThirdsFilterClassification
} = thirdsSlice.actions;

export type thirdsSliceType = typeof thirdsSlice;

export default thirdsSlice.reducer;
