import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface Exercise {
	uid: string;
	title: string;
	content: string;
	type: ExerciseType;
	response?: string;
	comment?: string;
}

export enum ExerciseType {
	Algo,
	Regex,
	RunAlgo
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
		return {
			...(snapshot.data(options) as Exercise),
			uid: snapshot.id
		};
	},
};
