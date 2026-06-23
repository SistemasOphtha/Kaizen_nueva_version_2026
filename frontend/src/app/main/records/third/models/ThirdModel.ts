import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { ThirdType } from '../types/ThirdType';

/**
 * The third model.
 */
const ThirdModel = (data: PartialDeep<ThirdType>): ThirdType =>
	_.defaults(data || {}, {
		id: 0,
		typeIdentification: '',
		identification: '',
		name: '',
		additionalName: '',
		email: '',
		address: '',
		phone: '',
		mobile: '',
		city: '',
		birthday: '',
		impact: 0,
		supplied: '',
		typeId: 0,
		classificationId: 0,
		specialtyId: 0,
		subSpecialtyId: 0,
		regionId: 0,
		status: '',
		createdAt: '',
		updatedAt: '',
		third_type: {
			id: 0,
			name: ''
		},
		// third_classification: {
		// 	id: 0,
		// 	name: ''
		// },
		// third_specialty: {
		// 	id: 0,
		// 	name: ''
		// },
		// third_subspecialty: {
		// 	id: 0,
		// 	name: ''
		// },
		// third_region: {
		// 	id: 0,
		// 	name: ''
		// },
		thirds_portfolios: []
	}) as ThirdType;

export default ThirdModel;
