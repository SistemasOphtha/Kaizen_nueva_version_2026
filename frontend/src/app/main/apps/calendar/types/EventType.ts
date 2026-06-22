/**
 * Event Type
 */

export type EventType = {
	id: string;
	title: string;
	start: string;
	end: string;
	allDay: boolean | undefined;
	extendedProps: {
		desc?: string;
		label?: number;
		component?: {
			id: string;
			name: string;
			route: string;
		};
	};
};
