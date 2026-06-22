import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { removeNavigationItem, resetNavigation, selectNavigation } from 'app/store/fuse/navigationSlice';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import { FuseNavigationProps } from '@fuse/core/FuseNavigation/FuseNavigation';
import { selectUser } from 'app/store/user/userSlice';

/**
 * Navigation
 */
function Navigation(props: Partial<FuseNavigationProps>) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useAppSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	// Remove the users component if the user is not an admin
	useEffect(() => {
		if (user && user.role) {
			if (!user.role.includes('Administrador')) {
				dispatch(removeNavigationItem('users-component'));
			} else {
				dispatch(resetNavigation());
			}
		}
	}, [dispatch, user]);

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<FuseNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default Navigation;
