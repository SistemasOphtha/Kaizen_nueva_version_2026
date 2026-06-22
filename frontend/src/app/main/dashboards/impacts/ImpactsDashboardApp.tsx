import { useEffect, useMemo } from 'react';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import ImpactsDashboardAppHeader from './ImpactsDashboardAppHeader';
import ThirdsAssignedWidget from './widgets/ThirdsAssignedWidget';
import ThirdsVisitsWidget from './widgets/ThirdsVisitsWidget';
import ThirdsNotVisitsWidget from './widgets/ThirdsNotVisitsWidget';
import ThirdsImpactAssignedWidget from './widgets/ThirdsImpactAssignedWidget';
import PercentageComplianceWidget from './widgets/PercentageComplianceWidget';
import ImpactsDataWidget from './widgets/ImpactsDataWidget';
import ImpactsFilterWidget from './widgets/ImpactsFilterWidget';
import ImpactsFilterType from './types/ImpactsFilterType';

/**
 * The impacts dashboard app.
 */
function ImpactsDashboardApp() {
	const dispatch = useAppDispatch();
	const widgets = useAppSelector(selectWidgets);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const impactsFilterData = (widgets.impactsFilterObject || {}) as ImpactsFilterType;

	useEffect(() => {
		const currentDate = new Date();
		const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		// const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
		const lastDayOfMonth = currentDate;
		const json = {
			startDate: firstDayOfMonth.toISOString(),
			endDate: lastDayOfMonth.toISOString(),
			region: 0,
			user: 0
		};
		dispatch(getWidgets(json));
	}, [dispatch]);

	const content = (
		<div className="w-full px-24 md:px-32 pb-24">
			{useMemo(() => {
				const container = {
					show: {
						transition: {
							staggerChildren: 0.06
						}
					}
				};

				const item = {
					hidden: { opacity: 0, y: 20 },
					show: { opacity: 1, y: 0 }
				};

				return (
					!_.isEmpty(widgets) && (
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-24 w-full min-w-0 p-24"
							variants={container}
							initial="hidden"
							animate="show"
						>
							<motion.div
								variants={item}
								className="flex flex-col flex-auto"
							>
								<ThirdsAssignedWidget />
							</motion.div>
							<motion.div
								variants={item}
								className="flex flex-col flex-auto"
							>
								<ThirdsImpactAssignedWidget />
							</motion.div>
							<motion.div
								variants={item}
								className="flex flex-col flex-auto"
							>
								<ThirdsVisitsWidget />
							</motion.div>
							<motion.div
								variants={item}
								className="flex flex-col flex-auto"
							>
								<ThirdsNotVisitsWidget />
							</motion.div>
							<motion.div
								variants={item}
								className="flex flex-col flex-auto"
							>
								<PercentageComplianceWidget />
							</motion.div>
							<motion.div
								variants={item}
								className="col-span-full"
							>
								<ImpactsDataWidget />
							</motion.div>
							{Object.keys(impactsFilterData).length !== 0 && (
								<motion.div
									variants={item}
									className="col-span-full"
								>
									<ImpactsFilterWidget />
								</motion.div>
							)}
						</motion.div>
					)
				);
			}, [widgets])}
		</div>
	);

	return (
		<FusePageSimple
			header={<ImpactsDashboardAppHeader />}
			content={content}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ImpactsDashboardApp;
