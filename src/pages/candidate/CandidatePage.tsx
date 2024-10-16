import {ReactElement} from 'react';
import {CandidateHeader} from '@playoff/shared/components/header/CandidateHeader.tsx';
import {Outlet} from 'react-router-dom';
import {CandidateFooter} from '@playoff/shared/components/footer/CandidateFooter.tsx';

export const CandidatePage = (): ReactElement => {
	
	// const {playoffUid} = useParams<{ playoffUid: string }>();
	// const activation: boolean = useActivationPlayoffSession(playoffUid);
	
	return <body className={'flex flex-col h-full justify-between'}>
	<CandidateHeader/>
	<Outlet/>
	<CandidateFooter/>
	</body>
}
