import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

export type UpdatePasswordType = {
	email: string;
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
};

/**
 * The type definition for a user object.
 */
export type UserType = {
	id: number;
	role: string[];
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigType>;
		twoFactorEnabled?: boolean;
		twoFactorMethod?: 'totp' | 'email';
	};
	loginRedirectUrl?: string;
};
