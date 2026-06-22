import { RootStateType } from 'app/store/types';
import { combineReducers } from '@reduxjs/toolkit';
import thirds, { thirdsSliceType } from './thirdsSlice';
import third, { thirdSliceType } from './thirdSlice';
import thirdTypes, { thirdTypesSliceType } from './thirdTypesSlice';
import thirdType, { thirdTypeSliceType } from './thirdTypeSlice';
import thirdClassification, { thirdClassificationSliceType } from './thirdClassificationSlice';
import thirdClassifications, { thirdClassificationsSliceType } from './thirdClassificationsSlice';
import thirdSpecialty, { thirdSpecialtySliceType } from './thirdSpecialtySlice';
import thirdSpecialtys, { thirdSpecialtysSliceType } from './thirdSpecialtysSlice';
import thirdSubSpecialty, { thirdSubSpecialtySliceType } from './thirdSubSpecialtySlice';
import thirdSubSpecialtys, { thirdSubSpecialtysSliceType } from './thirdSubSpecialtysSlice';
import thirdRegion, { thirdRegionSliceType } from './thirdRegionSlice';
import thirdRegions, { thirdRegionsSliceType } from './thirdRegionsSlice';

/**
 * The Contacts App slices.
 */

const reducer = combineReducers({
	thirds,
	third,
	thirdTypes,
	thirdType,
	thirdClassification,
	thirdClassifications,
	thirdSpecialty,
	thirdSpecialtys,
	thirdSubSpecialtys,
	thirdSubSpecialty,
	thirdRegions,
	thirdRegion
});

export default reducer;

export type AppRootStateType = RootStateType<
	[
		thirdsSliceType,
		thirdSliceType,
		thirdTypesSliceType,
		thirdTypeSliceType,
		thirdClassificationSliceType,
		thirdClassificationsSliceType,
		thirdSpecialtySliceType,
		thirdSpecialtysSliceType,
		thirdSubSpecialtySliceType,
		thirdSubSpecialtysSliceType,
		thirdRegionsSliceType,
		thirdRegionSliceType
	]
>;
