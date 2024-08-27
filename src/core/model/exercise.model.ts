import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface Exercise {
	uid: string;
	title: string;
	content: string;
	response?: string;
	comment?: string;
}

/**
 * Exercise converter for Firestore
 */
export const exerciseConverter: FirestoreDataConverter<Exercise> = {
	/**
	 * Convert Exercise from Json object to Firestore document
	 * @param exercise {Exercise}
	 */
	toFirestore(exercise: Exercise): DocumentData {
		return {...exercise};
	},
	
	/**
	 * Convert Exercise from Firestore to Json object
	 * @param snapshot {QueryDocumentSnapshot}
	 * @param options {SnapshotOptions}
	 */
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Exercise {
		const data: DocumentData = snapshot.data(options);
		return {
			uid: snapshot.id,
			title: data.title,
			content: data.content,
			response: data.response,
			comment: data.comment
		};
	},
};