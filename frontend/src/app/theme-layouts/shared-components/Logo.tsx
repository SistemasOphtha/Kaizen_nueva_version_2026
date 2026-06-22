import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center justify-center w-full">
			<img
				className="logo-icon h-48 md:h-60 w-auto rounded-8 shadow-sm transition-all duration-200"
				src="assets/images/logo/ophtha.jpg"
				alt="logo"
			/>
		</Root>
	);
}

export default Logo;
