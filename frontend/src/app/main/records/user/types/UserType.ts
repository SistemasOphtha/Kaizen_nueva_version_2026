export type ThirdPortfolioType = {
	id: number;
	approved: boolean;
	status: string;
	third: {
		id: number;
		typeIdentification: string;
		identification: string;
		name: string;
		additionalName: string;
		email: string;
		impact: number;
		status: string;
	};
};

export type PortfolioType = {
	id: number;
	name: string;
	status: string;
	thirds_portfolios: [ThirdPortfolioType];
	userId: number;
};

/**
 * User Type
 */
export type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	mobile: string;
	category: string;
	classificationId: number;
	regionId: number;
	status: string;
	user_classification?: {
		id: number;
		name: string;
		status: string;
	};
	region?: {
		id: number;
		name: string;
		status: string;
	};
	portfolios: [PortfolioType];
};

/**
 * Users Type
 */
export type UsersType = UserType[];
