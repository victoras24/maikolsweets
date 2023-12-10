import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../data/firebase";
import { doc, setDoc } from "firebase/firestore"
import { firestore } from '../data/firebase';
import useShowToast from './useShowToast';

const useSignUpWithEmailAndPassword = () => {
    const showToast = useShowToast();
    const [
        createUserWithEmailAndPassword,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            console.log("fill")
            showToast("Error", "Please fill all the fields", "error")
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    savedProducts: [],
                    orderHistory: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return { loading, signup }
}

export default useSignUpWithEmailAndPassword