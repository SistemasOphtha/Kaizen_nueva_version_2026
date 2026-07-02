import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserCategoryType } from '../types/UserCategoryType';
import { RootState } from 'app/store';

export const getUserCategory = createAsyncThunk('userCategory/getUserCategory', async (id: string) => {
	const response = await axios.get(`/api/user-categories/${id}`);
	const data = (await response.data.data) as UserCategoryType;
	return data;
});

export const addUserCategory = createAsyncThunk('userCategory/addUserCategory', async (category: Partial<UserCategoryType>) => {
	const response = await axios.post('/api/user-categories', category);
	const data = (await response.data.data) as UserCategoryType;
	return data;
});

export const updateUserCategory = createAsyncThunk('userCategory/updateUserCategory', async (category: UserCategoryType) => {
	const response = await axios.put(`/api/user-categories/${category.id}`, category);
	const data = (await response.data.data) as UserCategoryType;
	return data;
});

export const deleteUserCategory = createAsyncThunk('userCategory/deleteUserCategory', async (id: string) => {
	await axios.delete(`/api/user-categories/${id}`);
	return id;
});

const initialState: UserCategoryType | null = null;

const userCategorySlice = createSlice({
	name: 'userCategory',
	initialState,
	reducers: {
		newUserCategory: () => ({
			id: 0,
			name: '',
			canCreate: false,
			canRead: true,
			canUpdate: false,
			canDelete: false
		}),
		resetUserCategory: () => null
	},
	extraReducers: (builder) => {
		builder.addCase(getUserCategory.fulfilled, (state, action) => action.payload);
		builder.addCase(addUserCategory.fulfilled, (state, action) => action.payload);
		builder.addCase(updateUserCategory.fulfilled, (state, action) => action.payload);
		builder.addCase(deleteUserCategory.fulfilled, (state, action) => null);
	}
});

export const { newUserCategory, resetUserCategory } = userCategorySlice.actions;

export const selectUserCategory = (state: RootState) => (state as any).userCategoriesModule?.userCategory ?? null;

export default userCategorySlice.reducer;
