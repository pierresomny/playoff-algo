import {Playoff} from '@playoff/core/model/playoff.model.ts';
import {useEffect, useState} from 'react';
import {getAllPlayoff, getPlayoffByUid} from '@playoff/core/service/playoff.service.ts';

/**
 * Fetch playoff by its uid
 * @param playoffUid {string}
 * @return {Playoff | undefined}
 */
export const usePlayoff = (playoffUid: string | undefined): Playoff | undefined => {
	const [playoff, setPlayoff] = useState<Playoff>();
	
	useEffect(() => {
		if (playoffUid)
			getPlayoffByUid(playoffUid).then(playoff => setPlayoff(playoff.data()))
	}, [playoffUid])
	
	return playoff;
}

/**
 * Fetch all playoff
 * @return {Playoff[]}
 */
export const usePlayoffs = (): Playoff[] => {
	const [playoffs, setPlayoffs] = useState<Playoff[]>([])
	
	useEffect(() => {
		getAllPlayoff().then((playoffs) => {
			setPlayoffs(playoffs.docs.map(playoff => playoff.data()))
		})
	}, []);
	
	return playoffs;
}
