import {ReactElement, useState} from 'react';
import {Exercise, ExerciseType} from '@playoff/core/model/exercise.model.ts';
import {ExercisesNav} from '@playoff/shared/components/exercises/ExercisesNav.tsx';
import {addExercise, updateExercise} from '@playoff/core/service/exercise.service.ts';

export const EditExercisePage = (): ReactElement => {
	const [selectedExercise, setSelectedExercise] = useState<Exercise>({
		comment: '', content: '', response: '', title: '', type: ExerciseType.Algo, uid: ''
		
	});
	
	/**
	 * Create a new exercise
	 */
	const createNewExercise = () => {
		// Set default
		setSelectedExercise({
			comment: '', content: '', response: '', title: '', type: ExerciseType.Algo, uid: ''
		});
	}
	
	/**
	 * Change selected exercise
	 * @param exercise {Exercise | undefined}
	 */
	const changeExercise = (exercise: Exercise | undefined) => {
		if (exercise) setSelectedExercise(exercise)
	}
	
	/**
	 * Save selected exercise
	 */
	const save = () => {
		if (selectedExercise.uid) {
			addExercise(selectedExercise).then(result => {
				const exercise: Exercise | undefined = result.data();
				if (exercise)
					setSelectedExercise(exercise)
			})
		} else {
			updateExercise(selectedExercise).then(result => {
				const exercise: Exercise | undefined = result.data();
				if (exercise)
					setSelectedExercise(exercise)
			})
		}
	}
	
	return (
		<main className={'w-full h-90vh flex h-full justify-stretch items-stretch'}>
			<div className={'bg-nav flex flex-col w-1/6'}>
				<button onClick={createNewExercise}
				        className={'m-2 p-1 bg-blue-500 hover:bg-blue-700 rounded'}>Ajouter
				</button>
				<ExercisesNav styleClass={'w-full'} selectedExercise={selectedExercise}
				              setSelectedExercise={changeExercise}/>
			</div>
			<div className={'w-5/6 flex-col flex'}>
				<div className={'flex'}>
					<div className={'p-4 flex-1'}>
						<label className={'text-2xl mb-4'}>Titre</label>
						<input className={'w-full p-2 bg-white text-black rounded'}
						       placeholder={'Veuillez saisir le titre de l\'exercice'}
						       value={selectedExercise?.title}
						       onChange={event => setSelectedExercise({...selectedExercise, title: event.target.value})}
						/>
					</div>
					<div className={'flex justify-evenly items-end p-4'}>
						<button
							onClick={() => setSelectedExercise({...selectedExercise, type: ExerciseType.Algo})}
							className={'p-2 rounded hover:bg-blue-700 ' + (selectedExercise?.type === ExerciseType.Algo ? 'bg-blue-700' : 'bg-blue-500')}>Algo
						</button>
						<button
							onClick={() => setSelectedExercise({...selectedExercise, type: ExerciseType.Regex})}
							className={'p-2 ml-4 mr-4 rounded hover:bg-blue-700 ' + (selectedExercise?.type === ExerciseType.Regex ? 'bg-blue-700' : 'bg-blue-500')}>Regex
						</button>
						<button
							onClick={() => setSelectedExercise({...selectedExercise, type: ExerciseType.RunAlgo})}
							className={'p-2 rounded hover:bg-blue-700 ' + (selectedExercise?.type === ExerciseType.RunAlgo ? 'bg-blue-700' : 'bg-blue-500')}>Algo
							à dérouler
						</button>
					</div>
				</div>
				<div className={'p-4'}>
					<label className={'text-2xl mb-4'}>Énoncé</label>
					<textarea className={'w-full p-2 bg-white text-black rounded'}
					          placeholder={'Veuillez saisir l\'énoncé de l\'exercice'}
					          value={selectedExercise?.content}
					          onChange={event => setSelectedExercise({
						          ...selectedExercise,
						          content: event.target.value
					          })}
					/>
				</div>
				<div className={'flex justify-center p-8'}>
					<button className={'p-3 bg-green-500 hover:bg-green-700 rounded'} onClick={save}>
						Sauvegarder
					</button>
				</div>
			</div>
		</main>)
}
