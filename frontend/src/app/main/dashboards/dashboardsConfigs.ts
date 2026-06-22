import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import ProjectDashboardAppConfig from './project/ProjectDashboardAppConfig';
import PendingVisitsDashboardAppConfig from './pendingVisits/PendingVisitsDashboardAppConfig';
import ImpactsDashboardAppConfig from './impacts/ImpactsDashboardAppConfig';
import ReportsDashboardAppConfig from './reports/ReportsDashboardAppConfig';
import WorkplanConfig from './workplan/WorkplanAppConfig';

const dashboardsConfigs: FuseRouteConfigsType = [
	ProjectDashboardAppConfig,
	PendingVisitsDashboardAppConfig,
	ImpactsDashboardAppConfig,
	ReportsDashboardAppConfig,
	WorkplanConfig
];

export default dashboardsConfigs;
