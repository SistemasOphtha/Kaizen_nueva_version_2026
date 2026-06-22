type ThirdsVisitsType = {
	title: string;
	data: {
		name: string;
		count: number;
		extra: {
			name?: string;
			count?: number;
		};
	};
};

export default ThirdsVisitsType;
