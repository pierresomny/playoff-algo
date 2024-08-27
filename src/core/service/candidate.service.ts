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
import {Candidate, candidateConverter} from "@playoff/core/model/candidate.model.ts";

/**
 * Retrieve all candidate
 * @return Promise<QuerySnapshot<Candidate>>
 */
export const getAllCandidate = async (): Promise<QuerySnapshot<Candidate>> => {
	return getDocs(
		collection(firestore, `candidates`).withConverter(candidateConverter)
	);
}

/**
 * Retrieve candidate by its uid
 * @param uid {string}
 * @return {Promise<DocumentSnapshot<Candidate>>}
 */
export const getCandidateByUid = async (uid: string): Promise<DocumentSnapshot<Candidate>> => {
	return getDoc(
		doc(firestore, `candidates/${uid}`).withConverter(candidateConverter)
	);
}

/**
 * Create a new candidate object and
 * @param candidate {Candidate}
 * @return {Promise<DocumentSnapshot<Candidate>>}
 */
export const addCandidate = async (candidate: Candidate): Promise<DocumentSnapshot<Candidate>> => {
	const newCandidate: DocumentReference<Candidate> = await addDoc(collection(firestore, `candidates`).withConverter(candidateConverter), candidate)
	return getCandidateByUid(newCandidate.id);
}

/**
 * Update a complete document candidate in the firestore database.
 * @param candidate {Candidate}
 * @return {Promise<DocumentSnapshot<Candidate>>}
 */
export const updateCandidate = async (candidate: Candidate): Promise<DocumentSnapshot<Candidate>> => {
	await setDoc(doc(firestore, `candidates/${candidate.uid}`).withConverter(candidateConverter), candidate);
	return getCandidateByUid(candidate.uid);
}

/**
 * Delete the candidate attached to the uid
 * @param uid {string}
 * @return {Promise<void>}
 */
export const deleteCandidate = async (uid: string): Promise<void> => {
	return deleteDoc(doc(firestore, `candidates/${uid}`));
}