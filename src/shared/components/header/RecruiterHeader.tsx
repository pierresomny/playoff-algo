import {ReactElement} from 'react';
import logo from '@playoff/assets/logo-sfeir.svg'
import {Outlet, useParams} from 'react-router-dom';
import {useAuthenticatedUser} from '@playoff/shared/hooks/user.hook.ts';
import {User} from '@firebase/auth';
import {TimerComponent} from '@playoff/shared/components/header/TimerComponent.tsx';

export const RecruiterHeader = (): ReactElement => {
	
	const user: User = useAuthenticatedUser();
	const {playoffUid} = useParams<{ playoffUid: string }>();
	
	return (
		<>
			<div className={'bg-header flex justify-between items-center sticky top-0 h:10vh p-4'}>
				<img src={logo} alt={'SFEIR Logo'} width={125} height={120}/>
				{playoffUid && <TimerComponent/>}
				<div className={'flex items-center'} id="menu-button" aria-expanded="true" aria-haspopup="true">
					<p className={'pr-4 text-white'}>{user.displayName}</p>
					<img className={'rounded-full h-12'} src={user.photoURL ?? undefined}
					     alt={`${user.displayName} profile picture`}/>
				</div>
			</div>
			<Outlet/>
		</>
	)
}
