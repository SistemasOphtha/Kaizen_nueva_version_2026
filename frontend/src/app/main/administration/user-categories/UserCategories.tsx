import FusePageSimple from '@fuse/core/FusePageSimple';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/store';
import { getUserCategories } from './store/userCategoriesSlice';

import UserCategoriesHeader from './UserCategoriesHeader';
import UserCategoriesTable from './UserCategoriesTable';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {}
}));

function UserCategories() {
	const dispatch = useAppDispatch();

	useDeepCompareEffect(() => {
		dispatch(getUserCategories());
	}, [dispatch]);

	return (
		<Root
			header={<UserCategoriesHeader />}
			content={
				<div className="p-24 w-full">
					<UserCategoriesTable />
				</div>
			}
			scroll="content"
		/>
	);
}

export default UserCategories;
