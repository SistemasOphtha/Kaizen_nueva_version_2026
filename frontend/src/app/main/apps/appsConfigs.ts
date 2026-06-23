import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import VisitAppConfig from './visit/VisitAppConfig';
// import WorkplanAppConfig from './workplan/WorkplanAppConfig';
import JustificationAppConfig from './justification/JustificationAppConfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';
import TutorialAppConfig from './tutorial/TutorialAppConfig';

const appsConfigs: FuseRouteConfigsType = [
	VisitAppConfig,
	// WorkplanAppConfig,
	JustificationAppConfig,
	CalendarAppConfig,
	TutorialAppConfig
];

export default appsConfigs;
