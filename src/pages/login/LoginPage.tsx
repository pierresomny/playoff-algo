import {ReactElement} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup, UserCredential,} from '@firebase/auth';
import {auth} from '@playoff/core/firebase/firebase.config';
import {addUser} from '@playoff/core/service/user.service';
import sfeir_logo from '@playoff/assets/logo-sfeir.svg';

/**
 * Page to handle login of recruiter in the application.
 * @constructor
 */
export const LoginPage = (): ReactElement => {
	
	const navigate: NavigateFunction = useNavigate();
	
	// Initialize Firebase Auth provider
	const provider = new GoogleAuthProvider();
	
	// whenever a user interacts with the provider, we force them to select an account
	provider.setCustomParameters({
		prompt: 'select_account ',
	});
	
	const logGoogleUser = async (): Promise<void> => {
		signInWithPopup(auth, provider).then((userCredential: UserCredential): void => {
			addUser(userCredential).then(object => {
				console.log('addUser then', object);
				navigate('/recruiter');
			});
		});
	};
	
	return <main className='flex h-full w-full justify-center'>
		<div
			className='flex w-full justify-evenly items-center bg-header'>
			<button
				className={'bg-white text-background flex justify-center items-center p-2 rounded-3xl hover:bg-blue-500'}
				onClick={logGoogleUser}>
				<svg className={'mr-2'} viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em"
				     height="1em"
				     data-icon="google" aria-hidden="true">
					<path
						d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"></path>
				</svg>
				Se connecter
			</button>
		</div>
		<div className='bg-nav flex h-full w-full flex-col items-center justify-center gap-20'>
			<img className={'w-3/5'} alt={'login_image'} src={sfeir_logo}/>
		</div>
	</main>
}
