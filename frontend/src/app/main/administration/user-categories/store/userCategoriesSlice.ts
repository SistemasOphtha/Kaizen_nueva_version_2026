import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'app/store';
import { UserCategoryType } from '../types/UserCategoryType';

export const getUserCategories = createAsyncThunk('userCategories/getUserCategories', async () => {
	const response = await axios.get('/api/user-categories');
	const data = (await response.data.data) as UserCategoryType[];
	return data;
});

const userCategoriesAdapter = createEntityAdapter<UserCategoryType>({});

export const {
	selectAll: selectUserCategories,
	selectEntities: selectUserCategoryEntities,
	selectById: selectUserCategoryById
} = userCategoriesAdapter.getSelectors((state: RootState) => (state as any).userCategoriesModule?.userCategories ?? userCategoriesAdapter.getInitialState());

const userCategoriesSlice = createSlice({
	name: 'userCategories',
	initialState: userCategoriesAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserCategories.fulfilled, (state, action) => {
			userCategoriesAdapter.setAll(state, action.payload);
		});
	}
});

export default userCategoriesSlice.reducer;
