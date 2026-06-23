/**
 * Third Type
 */

export type ThirdPortfolio = {
	id: number;
	status: string;
	approved: boolean;
	portfolio: {
		id: number;
		name: string;
		status: string;
		userId: number;
		user: {
			id: number;
			firstName: string;
			lastName: string;
			email: string;
			status: string;
		};
	};
};

export type ThirdType = {
	id: number;
	typeIdentification: string;
	identification: string;
	name: string;
	additionalName: string;
	email: string;
	address: string;
	phone: string;
	mobile: string;
	city: string;
	birthday: string;
	impact: number;
	supplied: string;
	typeId: number;
	classificationId: number;
	specialtyId: number;
	subSpecialtyId: number;
	regionId: number;
	latitude?: number;
	longitude?: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	thirds_portfolios: [ThirdPortfolio];
	third_type: {
		id: number;
		name: string;
	};
	third_classification?: {
		id: number;
		name: string;
	};
	third_specialty?: {
		id: number;
		name: string;
	};
	third_sub_specialty?: {
		id: number;
		name: string;
	};
	region?: {
		id: number;
		name: string;
	};
};

/**
 * Contacts Type
 */
export type ThirdsType = ThirdType[];
