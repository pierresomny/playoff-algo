import {ReactElement} from 'react';
import {useParams} from 'react-router-dom';
import {useTimerPlayoffSession} from '@playoff/shared/hooks/playoffSession.hook.ts';
import {ResetIcon} from '@playoff/shared/icons/ResetIcon.tsx';
import {PlayPauseIcon} from '@playoff/shared/icons/PlayPauseIcon.tsx';

export const TimerComponent = (): ReactElement => {
	const {playoffUid} = useParams<{ playoffUid: string }>();
	const [timer, resumeStopTimer, resetTimer] = useTimerPlayoffSession(playoffUid);
	
	return <div className={'flex items-center'}>
		<p className={'mr-4 text-4xl'}>{timer()}</p>
		<button className={'btn'} onClick={resetTimer}><ResetIcon/></button>
		<button className={'btn'} onClick={resumeStopTimer}><PlayPauseIcon/></button>
	</div>
}
