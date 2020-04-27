import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDFYEiaVMPejpdgHECxTRLEnKLa5lAVpCw",
    authDomain: "crown-db-47936.firebaseapp.com",
    databaseURL: "https://crown-db-47936.firebaseio.com",
    projectId: "crown-db-47936",
    storageBucket: "crown-db-47936.appspot.com",
    messagingSenderId: "479923933266",
    appId: "1:479923933266:web:588d0f6db79590cc088f8b",
    measurementId: "G-J1K0LWCDNM"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
