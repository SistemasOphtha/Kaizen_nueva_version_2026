type ImpactsTitle = {
	[key: string]: string;
};

type ImpactsOverviewData = {
	[key: string]: number;
};

type ImpactsSeriesData = {
	name: string;
	type: string;
	data: number[];
};

/**
 * Impacts Data Type
 */
type ImpactsDataType = {
	title: ImpactsTitle;
	overview: Record<string, ImpactsOverviewData>;
	ranges: Record<string, string>;
	labels: string[];
	series: Record<string, ImpactsSeriesData[]>;
};

export default ImpactsDataType;
