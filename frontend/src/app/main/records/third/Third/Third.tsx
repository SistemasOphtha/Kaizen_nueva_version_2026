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
import { getThird, newThird, resetThird, selectThird } from '../store/thirdSlice';
import { getThirdTypes } from '../store/thirdTypesSlice';
import { getThirdClassifications } from '../store/thirdClassificationsSlice';
import { getThirdSpecialtys } from '../store/thirdSpecialtysSlice';
import { getThirdSubSpecialtys } from '../store/thirdSubSpecialtysSlice';
import { getThirdRegions } from '../store/thirdRegionsSlice';
import ThirdHeader from './ThirdHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import ContactInfoTab from './tabs/ContactInfoTab';
import AdditionalInfoTab from './tabs/AdditionalInfoTab';
import PortfolioInfoTab from './tabs/PortfolioInfoTab';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a third name').min(5, 'The third name must be at least 5 characters'),
	identification: yup
		.string()
		.required('You must enter a identification')
		.min(5, 'The identification must be at least 5 characters')
		.max(15, 'The identification must be at most 15 characters'),
	department: yup.string().nullable()
});

/**
 * The third page.
 */
function Third() {
	const dispatch = useAppDispatch();
	const { data: third, status } = useAppSelector(selectThird);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noThird, setNoThird] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateThirdState() {
			const { thirdId } = routeParams;
			dispatch(getThirdTypes());
			dispatch(getThirdClassifications());
			dispatch(getThirdSpecialtys());
			dispatch(getThirdSubSpecialtys());
			dispatch(getThirdRegions());
			if (thirdId === 'new') {
				/**
				 * Create New Third data
				 */
				dispatch(newThird());
			} else {
				/**
				 * Get Third data
				 */
				dispatch(getThird(thirdId)).then((action) => {
					/**
					 * If the requested third is not exist show message
					 */
					if (!action.payload) {
						setNoThird(true);
					}
				});
			}
		}

		updateThirdState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!third) {
			return;
		}
		/**
		 * Reset the form on third state changes
		 */
		reset(third);
	}, [third, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Third on component unload
			 */
			dispatch(resetThird());
			setNoThird(false);
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
	 * Show Message if the requested thirds is not exists
	 */
	if (noThird) {
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
					¡El panel no se encuentra disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/records/thirds"
					color="inherit"
				>
					Ir a la página de paneles
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while third data is loading and form is setted
	 */
	if (_.isEmpty(form) || (third && routeParams.thirdId !== third.id.toString() && routeParams.thirdId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ThirdHeader />}
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
								label="Información Personal"
							/>
							<Tab
								className="h-64"
								label="Información de Contacto"
							/>
							<Tab
								className="h-64"
								label="Información adicional"
							/>
							<Tab
								className="h-64"
								label="Portafolio"
							/>
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<BasicInfoTab setTabValue={setTabValue} />
							</div>

							<div className={tabValue !== 1 ? 'hidden' : ''}>
								<ContactInfoTab setTabValue={setTabValue} />
							</div>

							<div className={tabValue !== 2 ? 'hidden' : ''}>
								<AdditionalInfoTab setTabValue={setTabValue} />
							</div>

							<div className={tabValue !== 3 ? 'hidden' : ''}>
								<PortfolioInfoTab />
							</div>
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Third;
