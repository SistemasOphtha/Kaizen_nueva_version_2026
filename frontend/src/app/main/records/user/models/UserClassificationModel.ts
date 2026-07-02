import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { UserClassificationType } from '../types/UserClassificationType';

/**
 * The user model.
 */
const UserClassificationModel = (data: PartialDeep<UserClassificationType>): UserClassificationType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		permissions: {},
		createdAt: '',
		updatedAt: ''
	});

export default UserClassificationModel;
