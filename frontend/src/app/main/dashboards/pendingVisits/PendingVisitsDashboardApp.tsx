import { useEffect, useMemo } from 'react';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import PendingVisitsDashboardAppHeader from './PendingVisitsDashboardAppHeader';
// import PreviousStatementWidget from './widgets/PreviousStatementWidget';
// import CurrentStatementWidget from './widgets/CurrentStatementWidget';
// import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import NotVisitCurrentMonthWidget from './widgets/NotVisitCurrentMonthWidget';

/**
 * The pendingVisits dashboard app.
 */
function PendingVisitsDashboardApp() {
	const dispatch = useAppDispatch();
	const widgets = useAppSelector(selectWidgets);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		dispatch(getWidgets({}));
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
							<div className="grid grid-cols-1 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="flex flex-col flex-auto"
								>
									<NotVisitCurrentMonthWidget />
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
			header={<PendingVisitsDashboardAppHeader />}
			content={content}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default PendingVisitsDashboardApp;
