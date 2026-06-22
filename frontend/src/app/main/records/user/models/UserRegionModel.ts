import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { UserRegionType } from '../types/UserRegionType';

/**
 * The user model.
 */
const UserRegionModel = (data: PartialDeep<UserRegionType>): UserRegionType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default UserRegionModel;
