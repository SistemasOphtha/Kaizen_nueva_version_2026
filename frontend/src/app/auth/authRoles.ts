/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	admin: ['Administrador'],
	
	adminAndCoordinator: ['Administrador', 'Coordinador'],

	staff: ['Administrador', 'Coordinador', 'Representante'],

	user: ['Administrador', 'Coordinador', 'Representante', 'user'],

	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};

export default authRoles;
