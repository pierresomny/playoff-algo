import {FirebaseApp, FirebaseOptions, initializeApp} from 'firebase/app';
import {connectFirestoreEmulator, Firestore, getFirestore,} from 'firebase/firestore';
import {Auth, connectAuthEmulator, getAuth} from 'firebase/auth';
import config from '@playoff/core/firebase/firebase.config.json';

const firebaseConfig: FirebaseOptions = config;

const app: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

if (location.hostname === 'localhost') {
	connectFirestoreEmulator(firestore, 'localhost', 8080);
	connectAuthEmulator(auth, 'http://localhost:4001', {
		disableWarnings: true,
	});
}

export {app, firestore, auth};
