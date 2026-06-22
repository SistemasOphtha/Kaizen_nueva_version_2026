import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import UserType from 'app/store/user/UserType';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<UserType>): UserType {
	data = data || {};

	return _.defaults(data, {
		id: 0,
		role: [],
		data: {
			displayName: '',
			photoURL: 'assets/images/avatars/brian-hughes.jpg',
			email: '',
			shortcuts: [],
			settings: {}
		}
	});
}

export default UserModel;
