import {Exercise} from "./exercise.model.ts";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface Playoff {
	uid: string;
	date: string;
	exercises: Exercise[];
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
		const data: DocumentData = snapshot.data(options);
		return {
			uid: snapshot.id,
			date: data.date,
			exercises: data.exercies,
		};
	},
};