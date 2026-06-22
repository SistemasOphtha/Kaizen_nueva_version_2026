/**
import { type } from './../../../../../@mock-api/ExtendedMockAdapter';
 * Workplan Type
 */
export type WorkplanType = {
	id: number;
	userId: number;
	typeEventId: number;
	startDate: string;
	endDate: string;
	description: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	user?: {
		id: number;
		firstName: string;
		lastName: string;
		region?: {
			name: string;
		};
	};
	typeEvent?: {
		id: number;
		name: string;
	};
};

/**
 * Contacts Type
 */
export type WorkplansType = WorkplanType[];
