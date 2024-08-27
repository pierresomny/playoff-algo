import {firestore} from "@playoff/core/firebase/firebase.config.ts";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	getDocs,
	QuerySnapshot,
	setDoc
} from 'firebase/firestore';
import {User, userConverter} from "@playoff/core/model/user.model.ts";

/**
 * Retrieve all user
 * @return Promise<QuerySnapshot<User>>
 */
export const getAllUser = async (): Promise<QuerySnapshot<User>> => {
	return getDocs(
		collection(firestore, `users`).withConverter(userConverter)
	);
}

/**
 * Retrieve user by its uid
 * @param uid {string}
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const getUserByUid = async (uid: string): Promise<DocumentSnapshot<User>> => {
	return getDoc(
		doc(firestore, `users/${uid}`).withConverter(userConverter)
	);
}

/**
 * Create a new user object and
 * @param user {User}
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const addUser = async (user: User): Promise<DocumentSnapshot<User>> => {
	const newUser: DocumentReference<User> = await addDoc(collection(firestore, `users`).withConverter(userConverter), user)
	return getUserByUid(newUser.id);
}

/**
 * Update a complete document user in the firestore database.
 * @param user {User}
 * @return {Promise<DocumentSnapshot<User>>}
 */
export const updateUser = async (user: User): Promise<DocumentSnapshot<User>> => {
	await setDoc(doc(firestore, `users/${user.uid}`).withConverter(userConverter), user);
	return getUserByUid(user.uid);
}

/**
 * Delete the user attached to the uid
 * @param uid {string}
 * @return {Promise<void>}
 */
export const deleteUser = async (uid: string): Promise<void> => {
	return deleteDoc(doc(firestore, `users/${uid}`));
}