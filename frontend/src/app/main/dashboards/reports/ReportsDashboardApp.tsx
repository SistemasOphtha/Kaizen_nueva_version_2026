import { useEffect, useMemo } from 'react';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import ReportsDashboardAppHeader from './ReportsDashboardAppHeader';
import FilterPanelsWidget from './widgets/FilterPanelsWidget';
import FilterReportDownload from './widgets/FilterReportDownload';
import CustomReportBuilderWidget from './widgets/CustomReportBuilderWidget';
import GeomarketingMapWidget from './widgets/GeomarketingMapWidget';
import { getUserRegions } from '../../records/user/store/userRegionsSlice';
import { getThirdTypes } from '../../records/third/store/thirdTypesSlice';
import { getUsers } from '../../records/user/store/usersSlice';

/**
 * The reports dashboard app.
 */
function ReportsDashboardApp() {
	const dispatch = useAppDispatch();
	const widgets = useAppSelector(selectWidgets);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		dispatch(
			getWidgets({
				type: 0,
				identification: '',
				name: '',
				region: 0,
				status: '',
				userId: 0
			})
		);
		dispatch(getUserRegions());
		dispatch(getThirdTypes());
		dispatch(getUsers());
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
							className="w-full"
							variants={container}
							initial="hidden"
							animate="show"
						>
							<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="xl:col-span-2 flex flex-col flex-auto"
								>
									<FilterReportDownload />
								</motion.div>
							</div>

							<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="xl:col-span-2 flex flex-col flex-auto"
								>
									<CustomReportBuilderWidget />
								</motion.div>
							</div>

							<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="xl:col-span-2 flex flex-col flex-auto"
								>
									<GeomarketingMapWidget />
								</motion.div>
							</div>

							<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="xl:col-span-2 flex flex-col flex-auto"
								>
									<FilterPanelsWidget />
								</motion.div>
							</div>
						</motion.div>
					)
				);
			}, [widgets])}
		</div>
	);

	return (
		<FusePageSimple
			header={<ReportsDashboardAppHeader />}
			content={content}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ReportsDashboardApp;
