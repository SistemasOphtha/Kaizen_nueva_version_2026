type ImpactsTitle = {
	[key: string]: string;
};

export type ImpactsOverviewData = {
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

export type ImpactsOverviewTableData = {
	columns: string[];
	rows: {
		id: number;
		user: string;
		identification: string;
		type: string;
		name: string;
		impact: number;
		visits: number;
	}[];
};

/**
 * Impacts Filter Type
 */
type ImpactsFilterType = {
	title: ImpactsTitle;
	overview: Record<string, ImpactsOverviewData[] | ImpactsOverviewTableData>;
	ranges: Record<string, string>;
};

export default ImpactsFilterType;
