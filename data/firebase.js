import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA1lkkgysDsz-yWOMRG8goZnFZqT4uNe40",
    authDomain: "maikol-sweets.firebaseapp.com",
    projectId: "maikol-sweets",
    storageBucket: "maikol-sweets.appspot.com",
    messagingSenderId: "691685301145",
    appId: "1:691685301145:web:c22c6033d57f6626db1108"
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

const facebookProvider = new FacebookAuthProvider()


export const auth = getAuth(app)

export const signInWithFacebookRedirect = () => {
    signInWithRedirect(auth, facebookProvider)
}

export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, googleProvider)
}

export { app }
