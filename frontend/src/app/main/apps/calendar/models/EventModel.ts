import _ from '@lodash';
import { DeepPartial } from 'react-hook-form';
// import formatISO from 'date-fns/formatISO';
import { EventType } from '../types/EventType';

/**
 * The event model.
 */
const EventModel = (data?: DeepPartial<EventType>): EventType =>
	_.defaults(data || {}, {
		id: '',
		title: '',
		allDay: true,
		start: new Date().toISOString(),
		end: new Date().toISOString(),
		extendedProps: {
			desc: '',
			label: 0,
			component: {
				id: '',
				name: '',
				route: ''
			}
		}
	});

export default EventModel;
