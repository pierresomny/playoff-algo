import {DataSnapshot, get, onValue, ref, Unsubscribe, update} from 'firebase/database';
import {database} from '@playoff/core/firebase/firebase.config.ts';
import {useEffect, useState} from 'react';


/**
 * Hook to provide an exercise object and listen for changes from realtime database.
 */
export const useCreatePlayoffSession = (
	playoffUid: string | undefined
): () => Promise<void> => {
	return async (): Promise<void> => {
		const path: string = `playoff-session/${playoffUid}/timer`;
		const currentTimestamp: number = new Date().getTime()
		await update(ref(database, path), {currentTimestamp})
	}
}

/**
 * Handle activation state of playoff session for current connected candidate
 * @param playoffUid {string | undefined}
 */
export const useActivationPlayoffSession = (
	playoffUid: string | undefined
): boolean => {
	const [active, setActive] = useState<boolean>(false);
	const path: string = `playoff-session/${playoffUid}/timer/isActive`;
	
	useEffect((): Unsubscribe => {
		return onValue(ref(database, path), (dataSnapshot: DataSnapshot): void => {
			if (dataSnapshot.exists()) setActive(dataSnapshot.val());
		})
	}, [path, setActive]);
	
	return active
}

export const useTimerPlayoffSession = (
	playoffUid: string | undefined
): [
	getTimer: () => string,
	resumeStopTimer: () => void,
	resetTimer: () => void
] => {
	// 45 minutes en secondes
	const [timeRemaining, setTimeRemaining] = useState(45 * 60);
	const [isActive, setIsActive] = useState(false);
	const path: string = `playoff-session/${playoffUid}/timer`
	
	const formattedTimer = (): string => {
		const min: number = Math.floor(timeRemaining / 60) << 0;
		const sec: number = Math.floor(timeRemaining % 60);
		return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
	}
	
	/**
	 * Resume or stop timer
	 */
	const resumeStopTimer = (): Promise<void> => {
		setIsActive(!isActive);
		return update(ref(database, path), {timeRemaining, isActive: !isActive})
	};
	/**
	 * Reset timer to original time (45min)
	 */
	const resetTimer = (): Promise<void> => {
		setTimeRemaining(45 * 60);
		setIsActive(false);
		return update(ref(database, path), {timeRemaining, isActive})
	};
	
	useEffect((): () => void => {
		let interval: NodeJS.Timeout;
		if (isActive) {
			interval = setInterval(async () => {
				console.log('timer running');
				setTimeRemaining((prevTime: number): number => prevTime - 1);
				await update(ref(database, path), {timeRemaining, isActive})
			}, 1000); // Mise à jour toutes les secondes
		}
		return (): void => clearInterval(interval); // Nettoie l'intervalle quand le composant est démonté ou quand le timer est stoppé
	}, [isActive, path, timeRemaining]);
	
	useEffect((): void => {
		get(ref(database, path)).then((result: DataSnapshot): void => {
			if (result.exists()) {
				setTimeRemaining(result.val().timeRemaining);
				setIsActive(result.val().isActive);
			} else {
				setTimeRemaining(45 * 60);
				setIsActive(true);
			}
		})
	}, [path])
	
	return [
		formattedTimer,
		resumeStopTimer,
		resetTimer
	];
}
