import {Exercise} from './exercise.model.ts';
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface Playoff {
	uid: string;
	date: string;
	candidateName: string;
	recruiterUid: string;
	exercises: { [exerciseUid: string]: Exercise };
}

/**
 * Playoff converter for Firestore
 */
export const playoffConverter: FirestoreDataConverter<Playoff> = {
	/**
	 * Convert Playoff from Json object to Firestore document
	 * @param playoff {Playoff}
	 */
	toFirestore(playoff: Playoff): DocumentData {
		return {...playoff};
	},
	
	/**
	 * Convert Playoff from Firestore to Json object
	 * @param snapshot {QueryDocumentSnapshot}
	 * @param options {SnapshotOptions}
	 */
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Playoff {
		return {
			...(snapshot.data(options) as Playoff),
			uid: snapshot.id
		};
	},
};
