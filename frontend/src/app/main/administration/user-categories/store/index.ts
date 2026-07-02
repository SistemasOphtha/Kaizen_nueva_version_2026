import { combineReducers } from '@reduxjs/toolkit';
import userCategories from './userCategoriesSlice';
import userCategory from './userCategorySlice';

const reducer = combineReducers({
	userCategories,
	userCategory
});

export default reducer;
