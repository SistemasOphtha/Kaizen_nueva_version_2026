import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { VisitType } from '../types/VisitType';

/**
 * The third model.
 */
const VisitModel = (data: PartialDeep<VisitType>): VisitType =>
	_.defaults(data || {}, {
		id: 0,
		typeId: 0,
		thirdId: 0,
		userId: 0,
		date: '',
		objective: '',
		comment: '',
		status: '',
		createdAt: '',
		updatedAt: '',
		third: {
			id: 0,
			identification: '',
			name: ''
		}
	});

export default VisitModel;
