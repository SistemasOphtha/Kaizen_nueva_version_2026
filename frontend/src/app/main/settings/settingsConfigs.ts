import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
// import ThirdAppConfig from './third/ThirdAppConfig';
import ResetPasswordAppConfig from './resetPassword/ResetPasswordAppConfig';
import ConfigAppConfig from './config/ConfigAppConfig';

const settingsConfigs: FuseRouteConfigsType = [ResetPasswordAppConfig, ConfigAppConfig];

export default settingsConfigs;
