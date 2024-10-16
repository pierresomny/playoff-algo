import {useEffect, useState} from 'react';
import {getAllExercise, getExerciseByUid} from '@playoff/core/service/exercise.service.ts';
import {Exercise} from '@playoff/core/model/exercise.model.ts';

/**
 * Fetch exercise by its uid
 * @param uid {string}
 */
export const useExercise = (uid: string | undefined): Exercise | undefined => {
	const [exercise, setExercise] = useState<Exercise>();
	
	useEffect(() => {
		if (uid)
			getExerciseByUid(uid).then(exercise => setExercise(exercise.data()))
	}, [uid])
	
	return exercise;
}

/**
 * Provide all exercices in the db
 */
export const useExercices = (): Exercise[] => {
	const [exercices, setExercises] = useState<Exercise[]>([])
	
	useEffect(() => {
		getAllExercise().then(exercices => setExercises(exercices.docs.map(exercise => exercise.data())))
	}, []);
	
	return exercices
}
