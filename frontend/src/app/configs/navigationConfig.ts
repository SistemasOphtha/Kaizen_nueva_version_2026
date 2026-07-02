import i18next from 'i18next';
import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

import authRoles from '../auth/authRoles';

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavigationType = [
	{
		id: 'pendientes',
		title: 'Pendientes',
		translate: 'PENDIENTES',
		type: 'group',
		icon: 'heroicons-outline:clipboard-list',
		children: [
			{
				id: 'workplans-component',
				title: 'Plan de Trabajo',
				translate: 'WORKPLANS',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/dashboards/workplans'
			},
			{
				id: 'pendingVisits-component',
				title: 'Visitas',
				translate: 'VISITS',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: '/dashboards/pending-visits'
			},
			{
				id: 'justifications-component',
				title: 'Justificaciones',
				translate: 'JUSTIFICATIONS',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: '/dashboards/pending-justifications'
			}
		]
	},
	{
		id: 'consultas',
		title: 'Consultas',
		translate: 'CONSULTAS',
		type: 'group',
		icon: 'heroicons-outline:search',
		children: [
			{
				id: 'calendar-component',
				title: 'Calendario',
				translate: 'CALENDAR',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/apps/calendar'
			},
			{
				id: 'visits-component',
				title: 'Visitas y Justificaciones',
				translate: 'VISITS_AND_JUSTIFICATIONS',
				type: 'item',
				icon: 'heroicons-outline:information-circle',
				url: '/apps/visits'
			}
		]
	},
	{
		id: 'indicadores-reportes',
		title: 'Indicadores y Reportes',
		translate: 'INDICATORS_REPORTS',
		type: 'group',
		auth: authRoles.adminAndCoordinator,
		icon: 'heroicons-outline:chart-bar',
		children: [
			{
				id: 'indicators-component',
				title: 'Indicadores',
				translate: 'INDICATORS',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: '/dashboards/indicators'
			},
			{
				id: 'reports-component',
				title: 'Reportes',
				translate: 'REPORTS',
				type: 'item',
				icon: 'heroicons-outline:document-report',
				url: '/dashboards/reports'
			}
		]
	},
	{
		id: 'comunicaciones',
		title: 'Comunicaciones',
		translate: 'COMMUNICATIONS',
		type: 'group',
		auth: authRoles.admin,
		icon: 'heroicons-outline:mail',
		children: [
			{
				id: 'birthday-emails-component',
				title: 'Correos de Cumpleaños',
				translate: 'BIRTHDAY_EMAILS',
				type: 'item',
				icon: 'heroicons-outline:cake',
				url: '/communications/birthdays'
			}
		]
	},
	{
		id: 'records',
		title: 'Records',
		subtitle: '',
		type: 'group',
		auth: authRoles.admin,
		icon: 'heroicons-outline:document',
		translate: 'RECORDS',
		children: [
			{
				id: 'users-component',
				title: 'Users',
				translate: 'USERS',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/records/users'
			},
			{
				id: 'user-classification-component',
				title: 'Classifications',
				translate: 'CLASSIFICATIONS',
				type: 'item',
				icon: 'heroicons-outline:shield-check',
				url: '/records/users/user-classifications'
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
	},
	{
		id: 'tutorial-component',
		title: 'Tutorial',
		translate: 'TUTORIAL',
		type: 'item',
		icon: 'heroicons-outline:book-open',
		url: '/apps/tutorial'
	}
];

export default navigationConfig;
