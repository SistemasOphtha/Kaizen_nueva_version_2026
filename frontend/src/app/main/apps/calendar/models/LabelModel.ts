import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { LabelType } from '../types/LabelType';

/**
 * The label model.
 */
function LabelModel(data?: PartialDeep<LabelType>) {
	data = data || {};

	return _.defaults(data, {
		id: 0,
		title: '',
		color: '#e75931',
		type: 'custom'
	});
}

export default LabelModel;
