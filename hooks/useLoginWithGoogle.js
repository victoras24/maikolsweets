import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../data/firebase";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore"
import { firestore } from '../data/firebase';
import { useNavigate } from "react-router-dom";

export const useLoginWithGoogle = () => {
    const navigate = useNavigate()
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);

    const googleLogin = async () => {
        try {
            const newUser = await signInWithGoogle()
            if (!newUser && error) {
                toast.error(error.message)
                return
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split('@')[0],
                    fullName: newUser.user.displayName,
                    profilePicURL: newUser.user.photoURL,
                    orderHistory: [],
                    savedProducts: [],
                    createdAt: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    return { googleLogin, error }
}
