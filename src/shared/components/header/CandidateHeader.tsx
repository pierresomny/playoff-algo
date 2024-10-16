import {ReactElement} from 'react';
import logo from '@playoff/assets/logo-sfeir.svg';

export const CandidateHeader = (): ReactElement => {
	return <header className={'bg-header flex justify-between sticky top-0 h:10vh p-4'}>
		<img src={logo} alt={'SFEIR Logo'} width={125} height={120}/>
		<div className={'h-full flex items-center'}>
			<p>Candidat TEST</p>
		</div>
	</header>
}
