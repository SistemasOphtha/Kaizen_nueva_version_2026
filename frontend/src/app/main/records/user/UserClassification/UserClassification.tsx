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
	getUserClassification,
	newUserClassification,
	resetUserClassification,
	selectUserClassification
} from '../store/userClassificationSlice';
import UserHeader from './UserClassificationHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({});

/**
 * The user page.
 */
function UserClassification() {
	const dispatch = useAppDispatch();
	const { data: classification, status } = useAppSelector(selectUserClassification);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noUser, setNoUser] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateUserState() {
			const { userClassificationId } = routeParams;
			if (userClassificationId === 'new') {
				/**
				 * Create New User data
				 */
				dispatch(newUserClassification());
			} else {
				/**
				 * Get User data
				 */
				dispatch(getUserClassification(userClassificationId)).then((action) => {
					/**
					 * If the requested user is not exist show message
					 */
					if (!action.payload) {
						setNoUser(true);
					}
				});
			}
		}

		updateUserState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!classification) {
			return;
		}
		/**
		 * Reset the form on user state changes
		 */
		reset(classification);
	}, [classification, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset User on component unload
			 */
			dispatch(resetUserClassification());
			setNoUser(false);
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
	 * Show Message if the requested users is not exists
	 */
	if (noUser) {
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
					¡La clasificaión no se encuentra disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/records/users/user-classifications"
					color="inherit"
				>
					Ir a la página de clasificaciones
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while user data is loading and form is setted
	 */
	if (
		_.isEmpty(form) ||
		(classification &&
			routeParams.userClassificationId !== classification.id.toString() &&
			routeParams.userClassificationId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<UserHeader />}
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

export default UserClassification;
