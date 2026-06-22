import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import UserAppConfig from './user/UserAppConfig';
import ThirdAppConfig from './third/ThirdAppConfig';

const RecordsConfigs: FuseRouteConfigsType = [UserAppConfig, ThirdAppConfig];

export default RecordsConfigs;
