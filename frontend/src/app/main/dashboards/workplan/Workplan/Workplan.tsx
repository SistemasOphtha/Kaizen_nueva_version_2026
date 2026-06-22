import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import { getWorkplan, newWorkplan, resetWorkplan, selectWorkplan } from '../store/workplanSlice';
import { getTypeEvents } from '../store/typeEventsSlice';
import WorkplanHeader from './WorkplanHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({
	typeEventId: yup.number().required('Este campo es requerido'),
	userId: yup.number().required('Este campo es requerido'),
	startDate: yup.string().required('Este campo es requerido'),
	endDate: yup.string().required('Este campo es requerido'),
	description: yup.string().required('Este campo es requerido')
});

/**
 * The workplan page.
 */
function Workplan() {
	const dispatch = useAppDispatch();
	const { data: workplan, status } = useAppSelector(selectWorkplan);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noWorkplan, setNoWorkplan] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateWorkplanState() {
			const { workplanId } = routeParams;
			dispatch(getTypeEvents());
			if (workplanId === 'new') {
				/**
				 * Create New Workplan data
				 */
				dispatch(newWorkplan());
			} else {
				/**
				 * Get Workplan data
				 */
				dispatch(getWorkplan(workplanId)).then((action) => {
					/**
					 * If the requested workplan is not exist show message
					 */
					if (!action.payload) {
						setNoWorkplan(true);
					}
				});
			}
		}

		updateWorkplanState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!workplan) {
			return;
		}

		/**
		 * Reset the form on workplan state changes
		 */
		reset(workplan);
	}, [workplan, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Workplan on component unload
			 */
			dispatch(resetWorkplan());
			setNoWorkplan(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event: SyntheticEvent, value: number) {
		setTabValue(value);
	}

	if (status === 'loading') {
		return <FuseLoading />;
	}
	/**
	 * Show Message if the requested workplans is not exists
	 */
	if (noWorkplan) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					El plan de trabajo solicitada no esta disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/dashboards/workplans"
					color="inherit"
				>
					Ir a la página de plan de trabajo
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while workplan data is loading and form is setted
	 */
	if (
		_.isEmpty(form) ||
		(workplan && routeParams.workplanId !== workplan.id.toString() && routeParams.workplanId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<WorkplanHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 border-b-1' }}
						>
							<Tab
								className="h-64"
								label="Información Básica"
							/>
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<BasicInfoTab />
							</div>
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Workplan;
