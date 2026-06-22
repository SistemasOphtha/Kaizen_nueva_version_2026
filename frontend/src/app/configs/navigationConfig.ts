import i18next from 'i18next';
import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavigationType = [
	// {
	// 	id: 'home-component',
	// 	title: 'Home',
	// 	translate: 'HOME',
	// 	type: 'item',
	// 	icon: 'heroicons-outline:home',
	// 	url: '/'
	// },
	{
		id: 'dashboards',
		title: 'Dashboards',
		translate: 'DASHBOARDS',
		type: 'group',
		icon: 'heroicons-outline:chart-pie',
		children: [
			// {
			// 	id: 'project-component',
			// 	title: 'Project',
			// 	translate: 'PROJECT',
			// 	type: 'item',
			// 	icon: 'heroicons-outline:chart-pie',
			// 	url: '/dashboards/project'
			// },
			{
				id: 'indicators-component',
				title: 'Indicators',
				translate: 'INDICATORS',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: '/dashboards/indicators'
			},
			{
				id: 'pendingVisits-component',
				title: 'Pending Visits',
				translate: 'PENDING_VISITS',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: '/dashboards/pending-visits'
			},
			{
				id: 'reports-component',
				title: 'Reports',
				translate: 'REPORTS',
				type: 'item',
				icon: 'heroicons-outline:document-report',
				url: '/dashboards/reports'
			},
			{
				id: 'workplans-component',
				title: 'Workplans',
				translate: 'WORKPLANS',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/dashboards/workplans'
			}
		]
	},
	{
		id: 'apps',
		title: 'Applications',
		subtitle: '',
		type: 'group',
		icon: 'heroicons-outline:cube',
		translate: 'APPLICATIONS',
		children: [
			{
				id: 'calendar-component',
				title: 'Calendar',
				translate: 'CALENDAR',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/apps/calendar'
			},
			{
				id: 'visits-component',
				title: 'Visits',
				translate: 'VISITS',
				type: 'item',
				icon: 'heroicons-outline:information-circle',
				url: '/apps/visits'
			},
			// {
			// 	id: 'workplans-component',
			// 	title: 'Workplans',
			// 	translate: 'WORKPLANS',
			// 	type: 'item',
			// 	icon: 'heroicons-outline:calendar',
			// 	url: '/apps/workplans'
			// },
			{
				id: 'justifications-component',
				title: 'Justifications',
				translate: 'JUSTIFICATIONS',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: '/apps/justifications'
			}
		]
	},
	{
		id: 'records',
		title: 'Records',
		subtitle: '',
		type: 'group',
		icon: 'heroicons-outline:document',
		translate: 'RECORDS',
		children: [
			{
				id: 'users-component',
				title: 'Users',
				translate: 'USERS',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				url: '/records/users',
				children: [
					{
						id: 'user-classification-component',
						title: 'Classifications',
						translate: 'CLASSIFICATIONS',
						type: 'item',
						icon: 'heroicons-outline:shield-check',
						url: '/records/users/user-classifications'
					}
				]
			},
			{
				id: 'thirds-component',
				title: 'thirds',
				translate: 'THIRDS',
				type: 'item',
				icon: 'heroicons-outline:users',
				url: '/records/thirds'
			}
		]
	}
];

export default navigationConfig;
