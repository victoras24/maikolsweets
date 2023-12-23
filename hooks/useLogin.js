import { auth, firestore } from "../data/firebase";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


export const useLogin = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)

    const login = async (inputs) => {

        if (!inputs.email || !inputs.password) {
            toast.error('Please fill in all fields')
        }
        try {

            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)

            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid)
                const docSnap = await getDoc(docRef)
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
                toast.success(`${userCred.user.email.split('@')[0]} has logged in`)
                // login user state auth store
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    return { loading, login, error }
}

