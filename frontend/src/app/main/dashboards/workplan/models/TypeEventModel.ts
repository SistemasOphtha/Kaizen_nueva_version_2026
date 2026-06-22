import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { TypeEventType } from '../types/TypeEventType';

/**
 * The third model.
 */
const TypeEventModel = (data: PartialDeep<TypeEventType>): TypeEventType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		status: '',
		createdAt: '',
		updatedAt: ''
	});

export default TypeEventModel;
