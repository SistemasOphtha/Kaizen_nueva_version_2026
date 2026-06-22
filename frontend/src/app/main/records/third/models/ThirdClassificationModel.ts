import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdClassificationType } from '../types/ThirdClassificationType';

/**
 * The third model.
 */
const ThirdClassificationModel = (data: PartialDeep<ThirdClassificationType>): ThirdClassificationType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default ThirdClassificationModel;
