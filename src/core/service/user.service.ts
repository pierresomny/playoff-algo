import {firestore} from '@playoff/core/firebase/firebase.config.ts';
import {
	collection,
	deleteDoc,
	doc,
	DocumentSnapshot,
	getDoc,
	getDocs,
	QuerySnapshot,
	setDoc,
} from 'firebase/firestore';
import {User, userConverter, UserRole} from '@playoff/core/model/user.model.ts';
import {UserCredential} from '@firebase/auth';

/**
 * Retrieve all user
 * @return Promise<QuerySnapshot<User>>
 */
export const getAllUser = async (): Promise<QuerySnapshot<User>> => {
	return getDocs(
		collection(firestore, 'users').withConverter(userConverter)
	);
}

/**
 * Retrieve user by its email
 * @param email
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const getUserByEmail = async (email: string): Promise<DocumentSnapshot<User>> => {
	return getDoc(
		doc(firestore, `users/${email}`).withConverter(userConverter)
	);
}

/**
 * Determine if a user exist in the database, if not he is inserted as a new user
 * @param userCredential {UserCredential}
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const addUser = async (userCredential: UserCredential): Promise<DocumentSnapshot<User>> => {
	
	if (!userCredential.user.email) {
		throw new Error('Invalid email');
	}
	
	let user: DocumentSnapshot<User> = await getUserByEmail(
		userCredential.user.email
	);
	
	if (!user.exists()) {
		const newUser: User = {
			uid: userCredential.user.uid,
			displayName: userCredential.user.displayName ?? '',
			photoURL: userCredential.user.photoURL ?? '',
			email: userCredential.user.email,
			role: UserRole.TechnicalRecruiter
		};
		// Save new user at uid in collection.
		await setDoc(doc(firestore, `users/${newUser.email}`), newUser);
		user = await getUserByEmail(newUser.email);
	}
	return user;
}

/**
 * Update a complete document user in the firestore database.
 * @param user {User}
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const updateUser = async (user: User): Promise<DocumentSnapshot<User>> => {
	await setDoc(doc(firestore, `users/${user.email}`).withConverter(userConverter), user);
	return getUserByEmail(user.email);
}

/**
 * Delete the user attached to the uid
 * @param uid {string}
 * @return {Promise<void>}
 */
export const deleteUser = async (uid: string): Promise<void> => {
	return deleteDoc(doc(firestore, `users/${uid}`));
}

/**
 * Check if user has role
 * @param email {string}
 * @param role {UserRole}
 * @return  {Promise<boolean>}
 */
export const userHasRole = async (email: string, role: UserRole): Promise<boolean> => {
	const user = await getUserByEmail(email);
	return user.data()?.role === role;
}
