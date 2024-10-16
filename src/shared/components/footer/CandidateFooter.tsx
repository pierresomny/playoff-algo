import {ReactElement} from 'react';
import {useParams} from 'react-router-dom';

export const CandidateFooter = (): ReactElement => {
	const {playoffUid} = useParams<{ playoffUid: string }>()
	
	if (!playoffUid)
		return <></>
	
	return <div>
	
	</div>
	
}
