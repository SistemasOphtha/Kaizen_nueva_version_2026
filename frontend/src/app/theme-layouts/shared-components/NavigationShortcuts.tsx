import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import { selectUserShortcuts, updateUserShortcuts } from 'app/store/user/userSlice';

type NavigationShortcutsProps = {
	className?: string;
	variant?: 'horizontal' | 'vertical';
};

/**
 * The navigation shortcuts.
 */
function NavigationShortcuts(props: NavigationShortcutsProps) {
	return null;
}

export default NavigationShortcuts;
