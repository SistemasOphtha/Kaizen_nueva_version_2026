import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdSubSpecialtyType } from '../types/ThirdSubSpecialtyType';

/**
 * The third model.
 */
const ThirdSubSpecialtyModel = (data: PartialDeep<ThirdSubSpecialtyType>): ThirdSubSpecialtyType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		specialtyId: 0,
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default ThirdSubSpecialtyModel;
