/**
 * Justification Type
 */
export type JustificationType = {
	id: number;
	thirdId: number;
	userId: number;
	date: string;
	dateToJustify: string;
	description: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	third?: {
		id: number;
		identification: string;
		name: string;
	};
};

/**
 * Contacts Type
 */
export type JustificationsType = JustificationType[];
