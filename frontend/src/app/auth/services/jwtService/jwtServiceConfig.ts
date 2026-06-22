/**
 * Configuration object containing the authentication service API endpoints
 */
const jwtServiceConfig = {
	signIn: 'api/auth/sign-in',
	signUp: 'api/auth/sign-up',
	signOut: 'api/auth/sign-out',
	accessToken: 'api/auth/access-token',
	updateUser: 'api/auth/user/update',
	updateUserPassword: 'api/users/update-password',
	resetPassword: 'api/auth/reset-password',
	loginVerify2FA: 'api/auth/2fa/login-verify'
};

export default jwtServiceConfig;
