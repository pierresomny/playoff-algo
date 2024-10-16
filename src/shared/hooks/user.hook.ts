import {User} from '@firebase/auth'
import {auth} from '@playoff/core/firebase/firebase.config.ts';
import {useEffect, useState} from 'react';
import {UserRole} from '@playoff/core/model/user.model.ts';
import {userHasRole} from '@playoff/core/service/user.service.ts';

export const useAuthenticatedUser = (): User => {
	const user: User | null = auth.currentUser;
	
	if (!user) {
		throw new Error('User not present');
	}
	
	return user;
}

/**
 * Hook to determine if a user has a role
 * @param email {string}
 * @param role {UserRole}
 * @return {boolean | undefined} - undefined used as a loading state
 */
export const useRoleChecker = (email: string | undefined, role: UserRole | undefined): boolean | undefined => {
	const [hasRole, setHasRole] = useState<boolean>();
	
	useEffect(() => {
		// if email and role is present.
		if (email && role) userHasRole(email, role).then(hasRole => setHasRole(hasRole));
		// else the state is left as undefined
	}, [email, role]);
	
	return hasRole;
}
