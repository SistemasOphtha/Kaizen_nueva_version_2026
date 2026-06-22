import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdSpecialtyType } from '../types/ThirdSpecialtyType';

/**
 * The third model.
 */
const ThirdSpecialtyModel = (data: PartialDeep<ThirdSpecialtyType>): ThirdSpecialtyType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default ThirdSpecialtyModel;
