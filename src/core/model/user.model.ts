import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from 'firebase/firestore';

export interface User {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	role: UserRole;
}

export enum UserRole {
	Admin = 5,
	TechnicalRecruiter = 1,
	TalentAdvocate = 0
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
		return {
			...(snapshot.data(options) as User),
			uid: snapshot.id
		};
	},
};
