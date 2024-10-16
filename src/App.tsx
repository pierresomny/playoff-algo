import {Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {LoginPage} from './pages/login/LoginPage.tsx';
import {ProtectedRoutes} from '@playoff/shared/guard/ProtectedRoute.tsx';
import {LostCandidatePage} from '@playoff/pages/candidate/LostCandidatePage.tsx';
import {PlayoffPage as CandidatePlayoffPage} from '@playoff/pages/candidate/PlayoffPage.tsx';
import {PlayoffPage as RecruiterPlayoffPage} from '@playoff/pages/recruiter/PlayoffPage.tsx';
import {RecruiterHeader} from '@playoff/shared/components/header/RecruiterHeader.tsx';
import {PlayoffsPage} from '@playoff/pages/recruiter/PlayoffsPage.tsx';
import {EditExercisePage} from '@playoff/pages/recruiter/EditExercisePage.tsx';
import {CandidatePage} from '@playoff/pages/candidate/CandidatePage.tsx';

export const App = (): ReactElement => {
	return (
		<Routes>
			<Route path={''} element={<LoginPage/>}/>
			<Route element={<ProtectedRoutes/>}>
				<Route path={'recruiter'} element={<RecruiterHeader/>}>
					<Route path={''} element={<PlayoffsPage/>}/>
					<Route path={':playoffUid'} element={<RecruiterPlayoffPage/>}/>
					<Route path={'edit-exercise'} element={<EditExercisePage/>}/>
				</Route>
			</Route>
			<Route path={'candidate'} element={<CandidatePage/>}>
				<Route path={''} element={<LostCandidatePage/>}/>
				<Route path={':playoffUid'} element={<CandidatePlayoffPage/>}/>
			</Route>
		</Routes>
	)
}
