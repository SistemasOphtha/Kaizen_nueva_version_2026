/**
 * Visit Type
 */
export type VisitType = {
	id: number;
	thirdId: number;
	typeId: number;
	userId: number;
	date: string;
	objective: string;
	comment: string;
	latitude?: number;
	longitude?: number;
	isVerified?: boolean;
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
export type VisitsType = VisitType[];
