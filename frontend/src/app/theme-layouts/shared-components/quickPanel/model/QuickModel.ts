import _ from '@lodash';

export type NotesType = {
	id: string;
	title: string;
	description: string;
	details: string;
};

export type EventsType = {
	id: string;
	title: string;
	description: string;
	details: string;
};

export type RemindersType = {
	id: string;
	title: string;
	description: string;
	details: {
		user: {
			id: string;
			firstName: string;
			lastName: string;
		};
	};
};

/**
 * The type of the QuickModel.
 */
export type QuickModelType = {
	notes: NotesType[];
	events: EventsType[];
	reminders: RemindersType[];
};

/**
 * The QuickModel class.
 * Implements QuickModelProps interface.
 */
function QuickModel(data: QuickModelType): QuickModelType {
	data = data || {
		notes: [],
		events: [],
		reminders: []
	};

	return _.defaults(data, {
		notes: [],
		events: [],
		reminders: []
	}) as QuickModelType;
}

export default QuickModel;
