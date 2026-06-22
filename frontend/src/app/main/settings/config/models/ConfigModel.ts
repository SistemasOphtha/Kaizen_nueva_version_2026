import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ConfigType } from '../types/ConfigType';

/**
 * The third model.
 */
const WorkplanModel = (data: PartialDeep<ConfigType>): ConfigType =>
	_.defaults(data || {}, {
		id: 0,
		name: '',
		label: '',
		value: '',
		type: ''
	});

export default WorkplanModel;
