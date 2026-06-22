import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch } from 'app/store';
import { getWorkplans } from '../store/workplansSlice';
import { getUserRegions } from '../../../records/user/store/userRegionsSlice';
import { getUsers } from '../../../records/user/store/usersSlice';

import WorkplanTable from './WorkplansTable';
import WorkplanHeader from './WorkplansHeader';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Workplans() {
	const dispatch = useAppDispatch();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useDeepCompareEffect(() => {
		dispatch(getWorkplans());
		dispatch(getUserRegions());
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);

	return (
		<Root
			header={<WorkplanHeader />}
			content={
				<div className="p-24 w-full">
					<WorkplanTable />
				</div>
			}
			ref={pageLayout}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default Workplans;
