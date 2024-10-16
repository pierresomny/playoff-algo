import {ReactElement, useEffect, useState} from 'react';
import {Exercise, ExerciseType} from '@playoff/core/model/exercise.model.ts';
import {useExercices} from '@playoff/shared/hooks/exercise.hook.ts';

export const ExercisesNav = (props: {
	styleClass?: string,
	selectedExercise: Exercise | undefined,
	setSelectedExercise: (exercise: Exercise | undefined) => void
}): ReactElement => {
	const {styleClass, selectedExercise, setSelectedExercise} = props
	const exercises: Exercise[] = useExercices();
	const [algoOpen, setAlgoOpen] = useState<boolean>(false);
	const [regexOpen, setRegexOpen] = useState<boolean>(false);
	const [runAlgoOpen, setRunAlgoOpen] = useState<boolean>(false);
	
	useEffect((): void => {
		if (exercises.length) {
			setSelectedExercise([...exercises].shift())
		}
	}, [exercises, setSelectedExercise])
	
	useEffect((): void => {
		if (selectedExercise) {
			setAlgoOpen(exercises
				.filter(exercise => exercise.uid === selectedExercise.uid && exercise.type === ExerciseType.Algo)
				.length > 0);
			setRegexOpen(exercises
				.filter(exercise => exercise.uid === selectedExercise.uid && exercise.type === ExerciseType.Regex)
				.length > 0);
			setRunAlgoOpen(exercises
				.filter(exercise => exercise.uid === selectedExercise.uid && exercise.type === ExerciseType.RunAlgo)
				.length > 0);
		}
	}, [exercises, selectedExercise])
	
	const displayExercisesByType = (type: ExerciseType, open: boolean): ReactElement => {
		return (
			<ul className={'transition ease-in-out duration-150 overflow-hidden w-full ' + (open ? 'h-auto mb-8' : 'h-0')}>
				{
					exercises
						.filter(exercise => exercise.type === type)
						.map(exercise => <li
							key={exercise.uid}
							className={'cursor-pointer pl-8 w-full hover:bg-blueGray-900 ' + (selectedExercise?.uid === exercise.uid ? 'bg-selected-nav' : '')}
							onClick={setSelectedExercise.bind(this, exercise)}>{exercise.title}</li>)
				}
			</ul>
		);
	}
	
	return <nav className={`h-full bg-nav text-white ${styleClass}`}>
		<button onClick={() => setAlgoOpen(!algoOpen)}
		        className={'flex p-1 items-center w-full'}>
			<p className={'transition mr-2 ease-in-out duration-150 ' + (algoOpen ? 'rotate-90' : 'rotate-0')}>{'> '}</p>
			Algo
		</button>
		{displayExercisesByType(ExerciseType.Algo, algoOpen)}
		<button onClick={() => setRegexOpen(!regexOpen)}
		        className={'flex p-1 items-center w-full'}>
			<p className={'transition mr-2 ease-in-out duration-150 ' + (regexOpen ? 'rotate-90' : 'rotate-0')}>{'> '}</p>
			Regex
		</button>
		{displayExercisesByType(ExerciseType.Regex, regexOpen)}
		<button onClick={() => setRunAlgoOpen(!runAlgoOpen)}
		        className={'flex p-1 items-center w-full'}>
			<p className={'transition mr-2 ease-in-out duration-150 ' + (runAlgoOpen ? 'rotate-90' : 'rotate-0')}>{'>'}</p>
			Algo à dérouler
		</button>
		{displayExercisesByType(ExerciseType.RunAlgo, runAlgoOpen)}
	
	</nav>
}
