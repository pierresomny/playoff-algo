import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface User {
	uid: string;
	displayName: string;
	photoUrl: string;
}

/**
 * User converter for Firestore
 */
export const userConverter: FirestoreDataConverter<User> = {
	/**
	 * Convert User from Json object to Firestore document
	 * @param user {User}
	 */
	toFirestore(user: User): DocumentData {
		return {...user};
	},
	
	/**
	 * Convert User from Firestore to Json object
	 * @param snapshot {QueryDocumentSnapshot}
	 * @param options {SnapshotOptions}
	 */
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): User {
		const data: DocumentData = snapshot.data(options);
		return {
			uid: snapshot.id,
			displayName: data.displayName,
			photoUrl: data.photoUrl,
		};
	},
};