import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1lkkgysDsz-yWOMRG8goZnFZqT4uNe40",
    authDomain: "maikol-sweets.firebaseapp.com",
    projectId: "maikol-sweets",
    storageBucket: "maikol-sweets.appspot.com",
    messagingSenderId: "691685301145",
    appId: "1:691685301145:web:c22c6033d57f6626db1108"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

const facebookProvider = new FacebookAuthProvider()

// Sign-in functions
export const signInWithFacebookPopup = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider)
        // Handle result
        console.log("Facebook user:", result.user)
    } catch (error) {
        console.error("Error signing in with Facebook:", error)
    }
}

export const signInWithGooglePopup = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        // Handle result
        console.log("Google user:", result.user)
    } catch (error) {
        console.error("Error signing in with Google:", error)
    }
}

export { app, auth, firestore, storage }
