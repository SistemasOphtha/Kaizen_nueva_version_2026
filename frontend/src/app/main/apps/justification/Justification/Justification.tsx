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
import {
	getJustification,
	newJustification,
	resetJustification,
	selectJustification
} from '../store/justificationSlice';
import { getThirds } from '../../../records/third/store/thirdsSlice';
import { getThirdTypes } from '../../../records/third/store/thirdTypesSlice';
import JustificationHeader from './JustificationHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({});

/**
 * The justification page.
 */
function Justification() {
	const dispatch = useAppDispatch();
	const { data: justification, status } = useAppSelector(selectJustification);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noJustification, setNoJustification] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateJustificationState() {
			dispatch(getThirds());
			dispatch(getThirdTypes());
			const { justificationId } = routeParams;
			if (justificationId === 'new') {
				// /**
				//  * Create New Justification data
				//  */
				dispatch(newJustification());
			} else {
				/**
				 * Get Justification data
				 */
				dispatch(getJustification(justificationId)).then((action) => {
					/**
					 * If the requested justification is not exist show message
					 */
					if (!action.payload) {
						setNoJustification(true);
					}
				});
			}
		}

		updateJustificationState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!justification) {
			return;
		}

		/**
		 * Reset the form on justification state changes
		 */
		reset(justification);
	}, [justification, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Justification on component unload
			 */

			dispatch(resetJustification());
			setNoJustification(false);
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
	 * Show Message if the requested justifications is not exists
	 */
	if (noJustification) {
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
					La justificación solicitada no esta disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/justifications"
					color="inherit"
				>
					Ir a la página de justificaciones
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while justification data is loading and form is setted
	 */
	if (
		_.isEmpty(form) ||
		(justification &&
			routeParams.justificationId !== justification.id.toString() &&
			routeParams.justificationId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<JustificationHeader />}
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

export default Justification;
