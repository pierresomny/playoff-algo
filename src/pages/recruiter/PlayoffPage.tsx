import {ReactElement, useState} from 'react';
import {ExercisesNav} from '@playoff/shared/components/exercises/ExercisesNav.tsx';
import {Exercise} from '@playoff/core/model/exercise.model.ts';
import {ExerciseComponent} from '@playoff/shared/components/exercises/ExerciseComponent.tsx';

export const PlayoffPage = (): ReactElement => {
	const [selectedExercise, setSelectedExercise] = useState<Exercise>();
	
	return <main className={'flex h-full'}>
		<ExercisesNav selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}/>
		<section className={'w-5/6 h-full'}>
			{selectedExercise && <ExerciseComponent exerciseUid={selectedExercise.uid}/>}
		</section>
	</main>
}
