import {FirebaseApp, FirebaseOptions, initializeApp} from 'firebase/app';
import {connectFirestoreEmulator, Firestore, getFirestore,} from 'firebase/firestore';
import {connectDatabaseEmulator, Database, getDatabase} from 'firebase/database';
import {Auth, connectAuthEmulator, getAuth} from 'firebase/auth';
import config from '@playoff/core/firebase/firebase.config.json';

const firebaseConfig: FirebaseOptions = config;

const app: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const database: Database = getDatabase(app);

if (location.hostname === 'localhost') {
	connectFirestoreEmulator(firestore, 'localhost', 8080);
	connectAuthEmulator(auth, 'http://localhost:9099', {
		disableWarnings: true,
	});
	connectDatabaseEmulator(database, 'localhost', 9000);
}

export {app, firestore, auth, database};
