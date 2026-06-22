import { ThirdsType } from '../../../records/third/types/ThirdType';

export type ThirdType = {
	type: string;
	identification: string;
	name: string;
	region: string;
	impact: number;
	status: string;
	userId: number;
};

type FilterPanelsWidgetType = {
	columns: string[];
	rows: ThirdType[];
	count: number;
	data: ThirdsType;
};

export default FilterPanelsWidgetType;
