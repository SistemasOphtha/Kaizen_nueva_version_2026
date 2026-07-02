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
import { getUser, newUser, resetUser, selectUser } from '../store/userSlice';
import { getUserClassifications } from '../store/userClassificationsSlice';
import { getUserRegions } from '../store/userRegionsSlice';
import { getThirds } from '../../third/store/thirdsSlice';
import { getUsers } from '../store/usersSlice';
import UserHeader from './UserHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import AdditionalInfoTab from './tabs/AdditionalInfoTab';
import PortfolioInfoTab from './tabs/PortfolioInfoTab';
import SecurityTab from './tabs/SecurityTab';
import { selectUser as selectAuthUser } from 'app/store/user/userSlice';

/**

 * Form Validation Schema
 */
const schema = yup.object().shape({});

/**
 * The user page.
 */
function User() {
	const dispatch = useAppDispatch();
	const { data: user, status } = useAppSelector(selectUser);
	const authUser = useAppSelector(selectAuthUser);
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
			const { userId } = routeParams;
			dispatch(getUserClassifications());
			dispatch(getUserRegions());
			dispatch(getThirds());
			dispatch(getUsers());
			if (userId === 'new') {
				/**
				 * Create New User data
				 */
				dispatch(newUser());
			} else {
				/**
				 * Get User data
				 */
				dispatch(getUser(userId)).then((action) => {
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
		if (!user) {
			return;
		}
		/**
		 * Reset the form on user state changes
		 */
		reset(user);
	}, [user, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset User on component unload
			 */
			dispatch(resetUser());
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
					¡El usuario no se encuentra disponible!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/records/users"
					color="inherit"
				>
					Ir a la página de usuarios
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while user data is loading and form is setted
	 */
	if (_.isEmpty(form) || (user && routeParams.userId !== user.id.toString() && routeParams.userId !== 'new')) {
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
							<Tab
								className="h-64"
								label="Información Adicional"
							/>
							<Tab
								className="h-64"
								label="Portafolios"
							/>
							{authUser.role.includes('Administrador') && (
								<Tab
									className="h-64"
									label="Seguridad"
								/>
							)}
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<BasicInfoTab />
							</div>
							<div className={tabValue !== 1 ? 'hidden' : ''}>
								<AdditionalInfoTab />
							</div>
							<div className={tabValue !== 2 ? 'hidden' : ''}>
								<PortfolioInfoTab />
							</div>
							{authUser.role.includes('Administrador') && (
								<div className={tabValue !== 3 ? 'hidden' : ''}>
									<SecurityTab />
								</div>
							)}
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default User;
