import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdRegionType } from '../types/ThirdRegionType';

/**
 * The third model.
 */
const ThirdRegionModel = (data: PartialDeep<ThirdRegionType>): ThirdRegionType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default ThirdRegionModel;
