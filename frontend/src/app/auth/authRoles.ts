/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	admin: ['Administrador'],

	/**
	 * The staff role grants access to users with the 'admin' or 'staff' role.
	 */
	staff: ['Administrador', 'Representante'],

	/**
	 * The user role grants access to users with the 'admin', 'staff', or 'user' role.
	 */
	user: ['Administrador', 'Representante', 'user'],

	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};

export default authRoles;
