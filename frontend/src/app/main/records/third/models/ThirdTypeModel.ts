import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdTypeType } from '../types/ThirdTypeType';

/**
 * The third model.
 */
const ThirdTypeModel = (data: PartialDeep<ThirdTypeType>): ThirdTypeType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default ThirdTypeModel;
