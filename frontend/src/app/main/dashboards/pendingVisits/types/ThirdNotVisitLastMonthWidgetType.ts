type ThirdType = {
	id: string;
	identification: string;
	name: string;
	count: number;
	impact: number;
};

type ThirdNotVisitLastMonthWidgetType = {
	columns: string[];
	rows: ThirdType[];
};

export default ThirdNotVisitLastMonthWidgetType;
