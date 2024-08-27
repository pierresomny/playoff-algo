import {Playoff} from "@playoff/core/model/playoff.model.ts";
import {useEffect, useState} from "react";
import {getPlayoffByUid} from "@playoff/core/service/playoff.service.ts";

/**
 * Fetch playoff by its uid
 * @param uid {string}
 */
export const usePlayoff = (uid: string): Playoff | undefined => {
	const [playoff, setPlayoff] = useState<Playoff>();
	
	useEffect(() => {
		getPlayoffByUid(uid).then(playoff => setPlayoff(playoff.data()))
	}, [uid])
	
	return playoff;
}