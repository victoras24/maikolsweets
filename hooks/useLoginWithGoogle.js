import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../data/firebase";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { firestore } from '../data/firebase';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export const useLoginWithGoogle = () => {
    const navigate = useNavigate()
    const { userLogin } = useAuth()
    const [signInWithGoogle, error] = useSignInWithGoogle(auth);

    const googleLogin = async () => {
        try {
            const newUser = await signInWithGoogle()
            if (!newUser && error) {
                toast.error(error.message)
                return
            }

            const userRef = doc(firestore, "users", newUser.user.uid)
            const userSnap = await getDoc(userRef)

            if (userSnap.exists()) {
                //login
                const userDoc = userSnap.data()
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                userLogin(userDoc)
            } else {
                //signup
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
                userLogin(userDoc)
                navigate("/")
            }
        }
        catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    return { googleLogin, error }
}
