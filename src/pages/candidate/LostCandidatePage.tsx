import {ReactElement} from 'react';

export const LostCandidatePage = (): ReactElement => {
	return <main className={'w-full h-full flex flex-col justify-center items-center'}>
		<h1 className={'text-xl text-center'}>Attention ! Tu sembles perdus, vérifie bien le lien que tu as reçu de la
			part de l'évaluateur !</h1>
	</main>
}
