import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA1lkkgysDsz-yWOMRG8goZnFZqT4uNe40",
    authDomain: "maikol-sweets.firebaseapp.com",
    projectId: "maikol-sweets",
    storageBucket: "maikol-sweets.appspot.com",
    messagingSenderId: "691685301145",
    appId: "1:691685301145:web:c22c6033d57f6626db1108"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

const facebookProvider = new FacebookAuthProvider()

export const signInWithFacebookRedirect = () => {
    signInWithPopup(auth, facebookProvider)
}

export const signInWithGoogleRedirect = () => {
    signInWithPopup(auth, googleProvider)
}

export { app, auth, firestore, storage }
