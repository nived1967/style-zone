import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpUBUwOG9Vh6nE3RSVGLrNAAZnUAsjPTA",
  authDomain: "style-zone-db-bae9b.firebaseapp.com",
  projectId: "style-zone-db-bae9b",
  storageBucket: "style-zone-db-bae9b.appspot.com",
  messagingSenderId: "796757785586",
  appId: "1:796757785586:web:667b6f1495dd8d1b82c96b"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email,password)=>
{
  if(!email || !password)
  return;

  return await createUserWithEmailAndPassword(auth,email,password);
}
