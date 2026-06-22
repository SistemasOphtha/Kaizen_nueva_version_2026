import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { WorkplanType } from '../types/WorkplanType';

/**
 * The third model.
 */
const WorkplanModel = (data: PartialDeep<WorkplanType>): WorkplanType =>
	_.defaults(data || {}, {
		id: 0,
		userId: 0,
		typeEventId: 0,
		startDate: '',
		endDate: '',
		description: '',
		status: '',
		createdAt: '',
		updatedAt: '',
		user: {
			id: 0,
			firstName: '',
			lastName: ''
		},
		typeEvent: {
			id: 0,
			name: ''
		}
	});

export default WorkplanModel;
