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
import {Exercise, exerciseConverter} from "@playoff/core/model/exercise.model.ts";

/**
 * Retrieve all exercise
 * @return Promise<QuerySnapshot<Exercise>>
 */
export const getAllExercise = async (): Promise<QuerySnapshot<Exercise>> => {
	return getDocs(
		collection(firestore, `exercises`).withConverter(exerciseConverter)
	);
}

/**
 * Retrieve exercise by its uid
 * @param uid {string}
 * @return {Promise<DocumentSnapshot<Exercise>>}
 */
export const getExerciseByUid = async (uid: string): Promise<DocumentSnapshot<Exercise>> => {
	return getDoc(
		doc(firestore, `exercises/${uid}`).withConverter(exerciseConverter)
	);
}

/**
 * Create a new exercise object and
 * @param exercise {Exercise}
 * @return {Promise<DocumentSnapshot<Exercise>>}
 */
export const addExercise = async (exercise: Exercise): Promise<DocumentSnapshot<Exercise>> => {
	const newExercise: DocumentReference<Exercise> = await addDoc(collection(firestore, `exercises`).withConverter(exerciseConverter), exercise)
	return getExerciseByUid(newExercise.id);
}

/**
 * Update a complete document exercise in the firestore database.
 * @param exercise {Exercise}
 * @return {Promise<DocumentSnapshot<Exercise>>}
 */
export const updateExercise = async (exercise: Exercise): Promise<DocumentSnapshot<Exercise>> => {
	await setDoc(doc(firestore, `exercises/${exercise.uid}`).withConverter(exerciseConverter), exercise);
	return getExerciseByUid(exercise.uid);
}

/**
 * Delete the exercise attached to the uid
 * @param uid {string}
 * @return {Promise<void>}
 */
export const deleteExercise = async (uid: string): Promise<void> => {
	return deleteDoc(doc(firestore, `exercises/${uid}`));
}