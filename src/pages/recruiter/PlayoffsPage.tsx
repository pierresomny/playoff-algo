import {ReactElement} from 'react';
import {usePlayoffs} from '@playoff/shared/hooks/playoff.hook.ts';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {Playoff} from '@playoff/core/model/playoff.model.ts';

export const PlayoffsPage = (): ReactElement => {
	const playoffs: Playoff[] = usePlayoffs();
	const navigate: NavigateFunction = useNavigate();
	
	const displayPlayoff = (playoff: Playoff): ReactElement => {
		return <li
			key={playoff.uid}
			onClick={() => navigate(playoff.uid)}
			className={'flex justify-between w-full link'}>
			<span>{playoff.candidateName}</span>
			<span>{'>'}</span>
		</li>
	}
	
	return <main className={'w-full flex flex-col justify-center items-center mt-12'}>
		<h1 className={'text-4xl mb-16'}>Playoffs : </h1>
		<ul className={'w-2/5'}>
			{
				playoffs.map(displayPlayoff)
			}
		</ul>
	</main>
}
