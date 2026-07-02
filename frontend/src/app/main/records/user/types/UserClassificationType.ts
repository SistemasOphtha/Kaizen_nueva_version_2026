/**
 * UserClassification Type
 */
export type UserClassificationType = {
	id: number;
	name: string;
	status: string;
	permissions: Record<string, any>;
	createdAt: string;
	updatedAt: string;
};

/**
 * UserClassifications Type
 */
export type UserClassificationsType = UserClassificationType[];
