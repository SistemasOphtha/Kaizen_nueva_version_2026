import FusePageSimple from '@fuse/core/FusePageSimple';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { getThirds, selectThirds } from '../store/thirdsSlice';
import { getThirdTypes } from '../store/thirdTypesSlice';

import ThirdTable from './ThirdsTable';
import ThirdHeader from './ThirdsHeader';

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

function ThirdParties() {
	const dispatch = useAppDispatch();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const thirds = useAppSelector(selectThirds) || [];

	useDeepCompareEffect(() => {
		dispatch(getThirds());
		dispatch(getThirdTypes());
	}, [dispatch]);

	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);

	// Contar especialidades/tipologías
	const oftalmologos = thirds.filter((t) => t.specialtyId === 1).length;
	const optometras = thirds.filter((t) => t.specialtyId === 2).length;
	const droguerias = thirds.filter((t) => t.typeId === 2).length;
	const comerciales = thirds.filter((t) => t.typeId === 3).length;

	return (
		<Root
			header={<ThirdHeader />}
			content={
				<div className="p-24 w-full">
					<Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
						<Paper className="p-16 flex flex-col items-center justify-center rounded-16 border-1 shadow-0 bg-blue-50 border-blue-200">
							<Typography className="text-12 font-bold text-blue-800 uppercase tracking-wider">Oftalmólogos</Typography>
							<Typography className="text-32 font-extrabold text-blue-900 mt-4">{oftalmologos}</Typography>
						</Paper>
						
						<Paper className="p-16 flex flex-col items-center justify-center rounded-16 border-1 shadow-0 bg-green-50 border-green-200">
							<Typography className="text-12 font-bold text-green-800 uppercase tracking-wider">Optómetras</Typography>
							<Typography className="text-32 font-extrabold text-green-900 mt-4">{optometras}</Typography>
						</Paper>

						<Paper className="p-16 flex flex-col items-center justify-center rounded-16 border-1 shadow-0 bg-purple-50 border-purple-200">
							<Typography className="text-12 font-bold text-purple-800 uppercase tracking-wider">Droguerías</Typography>
							<Typography className="text-32 font-extrabold text-purple-900 mt-4">{droguerias}</Typography>
						</Paper>

						<Paper className="p-16 flex flex-col items-center justify-center rounded-16 border-1 shadow-0 bg-orange-50 border-orange-200">
							<Typography className="text-12 font-bold text-orange-800 uppercase tracking-wider">Comerciales</Typography>
							<Typography className="text-32 font-extrabold text-orange-900 mt-4">{comerciales}</Typography>
						</Paper>
					</Box>
					<ThirdTable />
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

export default ThirdParties;
