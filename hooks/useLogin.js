import { auth, firestore } from "../data/firebase";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const { userLogin } = useAuth()
    const navigate = useNavigate()
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
                userLogin(docSnap.data())
                navigate("/")
                toast.success(`${userCred.user.email.split('@')[0]} has logged in`)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    return { loading, login, error }
}

