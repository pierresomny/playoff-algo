import {PlayoffContext} from "../../shared/context/playoff.context.ts";
import {CandidateHeader} from "../../shared/header/candidate/CandidateHeader.tsx";
import {Outlet, useParams} from "react-router-dom";
import {usePlayoff} from "../../shared/hooks/playoff.hook.ts";

/**
 * Playoff component
 * @constructor
 */
export const Playoff = () => {
	const {playoffUid} = useParams<{ playoffUid: string }>()
	
	if (playoffUid === undefined) throw Error();
	
	const playoff = usePlayoff(playoffUid)
	
	return <PlayoffContext.Provider value={{playoff}}>
		<CandidateHeader/>
		<Outlet/>
	</PlayoffContext.Provider>
}