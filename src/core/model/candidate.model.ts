import {Playoff} from "./playoff.model.ts";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface Candidate {
	uid: string;
	displayName: string;
	playoffs: Playoff[]
}

/**
 * Candidate converter for Firestore
 */
export const candidateConverter: FirestoreDataConverter<Candidate> = {
	/**
	 * Convert Candidate from Json object to Firestore document
	 * @param candidate {Candidate}
	 */
	toFirestore(candidate: Candidate): DocumentData {
		return {...candidate};
	},
	
	/**
	 * Convert Candidate from Firestore to Json object
	 * @param snapshot {QueryDocumentSnapshot}
	 * @param options {SnapshotOptions}
	 */
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Candidate {
		const data: DocumentData = snapshot.data(options);
		return {
			uid: snapshot.id,
			displayName: data.displayName,
			playoffs: data.playoff,
		};
	},
};