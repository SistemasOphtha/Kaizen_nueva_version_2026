import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { UserType } from '../types/UserType';

/**
 * The user model.
 */
const UserModel = (data: PartialDeep<UserType>): UserType =>
	_.defaults(data || {}, {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		mobile: '',
		categoryId: 0,
		classificationId: 0,
		regionId: 0,
		status: '',
		user_classification: {
			id: 0,
			name: '',
			status: ''
		},
		userCategory: {
			id: 0,
			name: '',
			canCreate: false,
			canRead: false,
			canUpdate: false,
			canDelete: false
		},
		region: {
			id: 0,
			name: '',
			status: ''
		},
		portfolios: []
	});

export default UserModel;
