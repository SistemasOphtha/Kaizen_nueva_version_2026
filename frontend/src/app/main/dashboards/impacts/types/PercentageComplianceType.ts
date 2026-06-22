type PercentageComplianceType = {
	title: string;
	data: {
		name: string;
		count: string | number;
		extra: {
			name?: string;
			count?: number;
		};
	};
};

export default PercentageComplianceType;
