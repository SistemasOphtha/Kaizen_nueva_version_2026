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
import { getVisit, newVisit, resetVisit, selectVisit } from '../store/visitSlice';
import { getThirds } from '../../../records/third/store/thirdsSlice';
import { getThird } from '../../../records/third/store/thirdSlice';
import { getThirdTypes } from '../../../records/third/store/thirdTypesSlice';
import VisitHeader from './VisitHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({
	typeId: yup.number().required('El tipo de panel es requerido'),
	thirdId: yup.number().required('El panel es requerido'),
	date: yup.string().required('La fecha de la visita es requerida'),
	objective: yup.string().required('El objetivo de la visita es requerido')
});

/**
 * The visit page.
 */
function Visit() {
	const dispatch = useAppDispatch();
	const { data: visit, status } = useAppSelector(selectVisit);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noVisit, setNoVisit] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateVisitState() {
			dispatch(getThirds());
			dispatch(getThirdTypes());
			const { visitId, thirdId } = routeParams;
			if (visitId === 'new') {
				/**
				 * Create New Visit data
				 */
				dispatch(newVisit());

				if (thirdId) {
					dispatch(getThird(thirdId));
				}
			} else {
				/**
				 * Get Visit data
				 */
				dispatch(getVisit(visitId)).then((action) => {
					/**
					 * If the requested visit is not exist show message
					 */
					if (!action.payload) {
						setNoVisit(true);
					}
				});
			}
		}

		updateVisitState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!visit) {
			return;
		}

		/**
		 * Reset the form on visit state changes
		 */
		reset(visit);
	}, [visit, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Visit on component unload
			 */
			dispatch(resetVisit());
			setNoVisit(false);
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
	 * Show Message if the requested visits is not exists
	 */
	if (noVisit) {
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
					La visita solicitada no esta disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/visits"
					color="inherit"
				>
					Ir a la página de visitas
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while visit data is loading and form is setted
	 */
	if (_.isEmpty(form) || (visit && routeParams.visitId !== visit.id.toString() && routeParams.visitId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<VisitHeader />}
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
								label="Detalles"
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

export default Visit;
