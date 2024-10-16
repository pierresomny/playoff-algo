import {firestore} from '@playoff/core/firebase/firebase.config.ts';
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
import {Playoff, playoffConverter} from '@playoff/core/model/playoff.model.ts';

/**
 * Retrieve all playoff
 * @return Promise<QuerySnapshot<Playoff>>
 */
export const getAllPlayoff = async (): Promise<QuerySnapshot<Playoff>> => {
	return getDocs(
		collection(firestore, 'playoffs').withConverter(playoffConverter)
	);
}

/**
 * Retrieve playoff by its uid
 * @param playoffUid {string}
 * @return {Promise<DocumentSnapshot<Playoff>>}
 */
export const getPlayoffByUid = async (playoffUid: string): Promise<DocumentSnapshot<Playoff>> => {
	return getDoc(
		doc(firestore, `playoffs/${playoffUid}`).withConverter(playoffConverter)
	);
}

/**
 * Create a new playoff object and
 * @param playoff {Playoff}
 * @return {Promise<DocumentSnapshot<Playoff>>}
 */
export const addPlayoff = async (playoff: Playoff): Promise<DocumentSnapshot<Playoff>> => {
	const newPlayoff: DocumentReference<Playoff> = await addDoc(collection(firestore, 'playoffs').withConverter(playoffConverter), playoff)
	return getPlayoffByUid(newPlayoff.id);
}

/**
 * Update a complete document playoff in the firestore database.
 * @param playoff {Playoff}
 * @return {Promise<DocumentSnapshot<Playoff>>}
 */
export const updatePlayoff = async (playoff: Playoff): Promise<DocumentSnapshot<Playoff>> => {
	await setDoc(doc(firestore, `playoffs/${playoff.uid}`).withConverter(playoffConverter), playoff);
	return getPlayoffByUid(playoff.uid);
}

/**
 * Delete the playoff attached to the uid
 * @param uid {string}
 * @return {Promise<void>}
 */
export const deletePlayoff = async (uid: string): Promise<void> => {
	return deleteDoc(doc(firestore, `playoffs/${uid}`));
}
