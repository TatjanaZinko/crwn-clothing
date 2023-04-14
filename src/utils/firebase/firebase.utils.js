import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    signInWithEmailAndPassword ,
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNr10g6Ytp71R00d6hpQxHXg7RkMuW-2s",
    authDomain: "crwn-clothing-a0acc.firebaseapp.com",
    projectId: "crwn-clothing-a0acc",
    storageBucket: "crwn-clothing-a0acc.appspot.com",
    messagingSenderId: "719681372469",
    appId: "1:719681372469:web:c5d0e374de666dd0bdcc7c"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (
    userAuth, 
    additianalInformation = {}
    ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additianalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async ( email, password ) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword( auth, email, password )
}

export const sighInAuthUserWithEmailAndPassword = async ( email, password ) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword( auth, email, password )
}

export const signOutUser = () => {
    signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

