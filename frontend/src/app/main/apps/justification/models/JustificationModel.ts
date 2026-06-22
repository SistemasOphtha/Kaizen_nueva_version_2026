import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { JustificationType } from '../types/JustificationType';

/**
 * The third model.
 */
const JustificationModel = (data: PartialDeep<JustificationType>): JustificationType =>
	_.defaults(data || {}, {
		id: 0,
		thirdId: 0,
		userId: 0,
		date: '',
		dateToJustify: '',
		description: '',
		status: '',
		createdAt: '',
		updatedAt: '',
		third: {
			id: 0,
			identification: '',
			name: ''
		}
	});

export default JustificationModel;
