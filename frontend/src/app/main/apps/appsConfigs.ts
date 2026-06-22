import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import VisitAppConfig from './visit/VisitAppConfig';
// import WorkplanAppConfig from './workplan/WorkplanAppConfig';
import JustificationAppConfig from './justification/JustificationAppConfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';

const appsConfigs: FuseRouteConfigsType = [
	VisitAppConfig,
	// WorkplanAppConfig,
	JustificationAppConfig,
	CalendarAppConfig
];

export default appsConfigs;
