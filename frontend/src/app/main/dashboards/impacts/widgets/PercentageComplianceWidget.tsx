import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useAppSelector } from 'app/store';
import { selectWidgets } from '../store/widgetsSlice';
import PercentageComplianceType from '../types/PercentageComplianceType';

/**
 * The PercentageComplianceWidget widget.
 */
function PercentageComplianceWidget() {
	const widgets = useAppSelector(selectWidgets);
	const { data, title } = (widgets.percentageComplianceObject || {
		title: 'Cumplimiento',
		data: { name: 'Porcentaje', count: '0%', extra: { name: 'Visitas realizadas', count: 0 } }
	}) as PercentageComplianceType;

	return (
		<Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
			<div className="flex items-center justify-between px-8 pt-12">
				<Typography
					className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
					color="text.secondary"
				>
					{title}
				</Typography>
			</div>
			<div className="text-center mt-8">
				<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-violet-500">
					{String(data.count)}
				</Typography>
				<Typography className="text-lg font-medium text-violet-600 dark:text-violet-500">{data.name}</Typography>
			</div>
			<Typography
				className="flex items-baseline justify-center w-full mt-20 mb-24"
				color="text.secondary"
			>
				<span className="truncate">{data.extra.name}</span>:<b className="px-8">{String(data.extra.count)}</b>
			</Typography>
		</Paper>
	);
}

export default memo(PercentageComplianceWidget);
