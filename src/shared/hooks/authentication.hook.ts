import {auth} from '@playoff//core/firebase/firebase.config';
import {onAuthStateChanged} from 'firebase/auth';
import {useState} from 'react';
import {User} from '@firebase/auth';

export const useAuthentication = () => {
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	
	onAuthStateChanged(auth, (user: User | null): void => {
		if (user) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false);
	});
	
	return {loading, isAuthenticated};
}
